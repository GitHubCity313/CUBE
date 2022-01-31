import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

export default function auth(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const signIn = async (credentials) => {
    try {
      const { email, password } = credentials;
      const db = await connect();
      const user = await db
        .collection("users")
        .find({ email, password })
        .toArray();

      if (user && user.length !== 0) {
        const { firstName, lastName, role, _id } = user.shift();
        const token = jwt.sign(
          { data: { id: _id, firstName, lastName, role } },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
          (err) => {
            throw Error;
          }
        );

        res.status(200).json({
          token,
        });
      } else {
        throw Error;
      }
    } catch (err) {
      return res.status(404).json({ message: "User or password is incorrect" });
    }
  };

  const signOut = async () => {
    console.log("out");
    // Faire expirer le token a la deco
    return res.status(200).json();
  };

  const getRoute = async (req, res) => {
    const credentials = req.body;
    const id = req.query.id;

    switch (id) {
      case "signIn":
        return await signIn(credentials);
      case "signOut":
        return await signOut();

      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}
