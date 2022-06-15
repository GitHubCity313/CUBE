export default function apiHome(_, res) {
  res.writeHead(302, {
    Location: "/doc",
  });
  return res.end();
}
