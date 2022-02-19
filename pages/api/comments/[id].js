import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default function comments(req , res) {
    const connect = async () => {
        const client = await clientPromise;
        const db = await client.db(process.env.MONGO_DB_NAME);
        return db;
    };

    const getCommentsFromResourceId = async (db, res, resourceId) => {
        try {
            const comments = await db.collection("comments").find( { relatedResource : ObjectId(resourceId) } ).toArray();
            return res.status(200).json({ comments });
        } catch (err) {
            return res.status(404).json({ err });
        }
    };

    const getRoute = async (req, res) => {
        const db = await connect();
        const id = req.query.id.trim();

        switch (req.method) {
            case "GET": {
                return await getCommentsFromResourceId(db, res, id);
            }
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }

    return getRoute(req, res);
}
