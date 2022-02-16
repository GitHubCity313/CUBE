import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import AuthContext from "./authContext";
import authService from "../services/authService";
import commonUtils from "../utils/commonUtils";
import jwt from "jsonwebtoken";
import apiService from "../services/apiService";
import md5 from "blueimp-md5";

// Welcome to the context o/
const AuthProvider = (props) => {
  // props du context. Refetch interval peut servir a modifier la duree de validite du token
  const { refetchInterval, children } = props;
  // Les states sont les etats par defaut du contexte. Donc de base, personne n'est connecte + 0 infos
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpPending, setIsSignUpPending] = useState(false);
  const [token, setToken] = useState("");
  const [session, setSession] = useState({});
  // Je mets les rôles a part pour le moment
  const [role, setRole] = useState(null);
  // Erreur a la connexion pour être affichee sur le formulaire
  const [error, setError] = useState("");
  // Acces au router pour les redirections
  const router = useRouter();

  // Les fonctions si dessous sont en callback pour actualiser le contexte a chaque fois qu'on les utilise
  // Genere une session utilisateur avec les infos du token
  const getSession = useCallback((token) => {
    const decoded = jwt.decode(token);
    const { lastName, firstName, role, profilePic } = decoded.data;
    setToken(token);
    setSession({ lastName, firstName, profilePic });
    setRole(role);
    return setIsAuthenticated(true);
  }, []);

  // Efface toutes les infos
  const shutSession = useCallback(() => {
    setRole("");
    setSession({});
    setToken("");
    return setIsAuthenticated(false);
  }, []);

  // Au chargement de l'app, cherche si un token est dans le local storage du navigateur
  // Si oui -> Cree un session avec les infos
  // Si non, clean le tout un petit coup pour le fun
  useEffect(() => {
    // Verifie dans le local storage si un token est deja present a chaque refresh
    const token = authService.get();
    // A l'arrivee sur la page, verifie le token present dans le local storage
    // S'il a expire, l'utilisateur est deconnecte
    const verifyToken = async () => authService.checkToken(token);
    setIsSignUpPending(false);

    if (commonUtils.isValid(JSON.stringify(token))) {
      const check = async () => {
        try {
          const check = await verifyToken();
          if (check.status === 200) {
            setToken(token);
            return getSession(token);
          } else {
            logOut();
          }
        } catch (err) {
          logOut();
        }
      };

      check();
    } else {
      authService.clear();
      return shutSession();
    }
  }, [children]);

  const hashCredentials = (credentials) => {
    const { password } = credentials;
    const encodedPass = md5(password);
    const encodedCredentials = { ...credentials, password: encodedPass };
    return encodedCredentials;
  };

  // Authentifie l'utilisateur -- Communiaue avec l'API pour generer un token
  const authenticate = async (credentials, callbackUrl) => {
    try {
      const encodedCredentials = hashCredentials(credentials);
      // Genere le token
      const check = await authService.signIn(
        encodedCredentials,
        refetchInterval
      );
      const { token } = check.data;
      // Store l'info dans le local storage
      authService.store(token);
      // Actualise les infos du contexte pour les diffuser dans toute l'app
      getSession(token);
      // Redirige vers le callback souhaité
      return router.push(callbackUrl);
    } catch (err) {
      if (err.response !== undefined) {
        // Recupere la reponse de l'API
        const { message } = err.response.data;
        // Actualise le state pour permettre de la recuperer depuis le front
        setError(message);
      } else {
        // Si l'erreur attrapee n'est pas standard, affiche une erreur generique
        setError("Une erreur est survenue");
      }
      return shutSession();
    }
  };

  // Authentifie l'utilisateur -- Communiaue avec l'API pour generer un token
  const createAccount = async (user, callbackUrl) => {
    try {
      const encodedCredentials = hashCredentials(user);

      const createUser = await authService.signUp(encodedCredentials);

      return setIsSignUpPending(true);
    } catch (err) {
      if (err.response !== undefined) {
        // Recupere la reponse de l'API
        const { message } = err.response.data;

        // Actualise le state pour permettre de la recuperer depuis le front
        setError(message);
      } else {
        // Si l'erreur attrapee n'est pas standard, affiche une erreur generique
        setError("Une erreur est survenue");
      }
      return shutSession();
    }
  };

  // Deconnecte l'utilisateur -- Communiaue avec l'API pour revoauer le token
  const logOut = async (callbackUrl) => {
    try {
      // Revoaue le token -- a faire
      const check = await authService.signOut(token);
      // Enleve le token du local storage
      authService.clear();
      setToken("");
      // Reinitialise le contexte
      shutSession();
      // Redirige vers le callback souhaite. Par defaut home
      return router.push(callbackUrl ? callbackUrl : "/");
    } catch (err) {
      authService.clear();
      setToken("");
      shutSession();
    }
  };

  const profile = async () => {
    if (token !== "") {
      try {
        const profile = await apiService.fetchProfile(token);
        return profile.data.user.shift();
      } catch (err) {
        console.log(err);
        return {};
      }
    }
  };

  const events = async (arr) => {
    try {
      const events = await apiService.fetchEvents(token, arr);
      return events.data.events;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const likes = async (arr) => {
    try {
      const likes = await apiService.fetchLikes(token, arr);
      return likes.data.resources;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // Ici, ce sont les infos du contexte que l'on interroge dans l'app. SignIn et SignOut peuvent être appelees
  // l'exterieur et servir a interroger les methodes a l'interieur du contexte
  // Les crochets en bas servent a determiner quand le contexte se met a jour
  // Ici, il le fait quand les states isAuthenticated et error changent
  const authData = useMemo(
    () => ({
      isAuthenticated,
      token,
      refetchInterval,
      session,
      role,
      error,
      isSignUpPending,
      fetchProfile: async () => await profile(),
      fetchLikes: async (arr) => await likes(arr),
      fetchEvents: async (arr) => await events(arr),
      // Petit util pour reset les erreurs sur le signIn quand on veux
      resetError: () => setError(""),
      signIn: async (credentials, callbackUrl) =>
        await authenticate(credentials, callbackUrl),
      signUp: async (user, callbackUrl) =>
        await createAccount(user, callbackUrl),
      signOut: async (callbackUrl) => await logOut(callbackUrl),
    }),
    [isAuthenticated, error, isSignUpPending]
  );

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
