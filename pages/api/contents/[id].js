import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function content(req, res) {
    const connect = async () => {
        const client = await clientPromise;
        const db = await client.db(process.env.MONGO_DB_NAME);
        return db;
    }

    const getContent = async (id, db, res) => {
        try {
            const content = await db
                .collection("contents")
                .find({ _id: ObjectId(id) })
                .toArray();
            return res.status(200).json({ content });
        } catch (err) {
            return res.status(404).json({ err });
        }
    };

    const getRoute = async (req, res) => {
        const db = await connect();
        const id = req.query.id.trim();
        // const content = req?.body ? req.body : null;

        switch (req.method) {
            case "GET": {
                return await getContent(id, db, res);
            }
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    };

    return getRoute(req, res);
}
