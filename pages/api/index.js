// Quand on appelle l'API sur "/" -> on est redirigé vers la doc

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: la description de l'erreur retournée.
 *           example: Invalid JWT
 */

export default function apiHome(_, res) {
  res.writeHead(302, {
    Location: "/doc",
  });
  return res.end();
}
