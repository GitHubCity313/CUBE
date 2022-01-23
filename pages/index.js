import { useEffect } from "react";
import Router from "next/router";

// Redirection vers un component Home pour eviter un affichage de ce qui est sur index.js a la fin des autres pages
export default function App() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push("/home");
    }
  }, [Router]);

  return null;
}
