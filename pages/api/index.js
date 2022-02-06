// Quand on appelle l'API sur "/" -> on est redirigé vers la doc
export default function apiHome(_, res) {
  res.writeHead(302, {
    Location: "/doc",
  });
  return res.end();
}
