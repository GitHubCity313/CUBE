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
 * 
 *     Credentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: l'email de l'utilisateur
 *           example: duhamel.artus@vmail.com
 *         password:
 *           type: string
 *           description: le mot de passe utilisateur.
 *           example: ac62218a80e48415349982a25907a000
 */

export default function apiHome(_, res) {
  res.writeHead(302, {
    Location: "/doc",
  });
  return res.end();
}
