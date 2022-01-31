// Middleware qui verifie le secret du JWT set dans next config
// Si un probleme est detecte, il rejette la demande sans arriver jusqu'a la requete API
import expressJwt from "express-jwt";
import getConfig from "next/config";
import { getToken } from "next-auth/jwt"

const { serverRuntimeConfig } = getConfig();

// This is an example of how to read a JSON Web Token from an API route
const { secret } = serverRuntimeConfig;

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}

export default jwtMiddleware;
