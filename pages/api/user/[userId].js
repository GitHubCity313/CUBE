import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default function userId(req, res) {

    const deleteUser = async (id) => {
        try{
            const client = await clientPromise;
            const db = await client.db(process.env.MONGO_DB_NAME);
            const user = await db.collection("users")
                .deleteOne({
                    _id: ObjectId(id)
                });
            // [server_logs] confirm 200 from db
            console.log(`[200] DELETE user with id : ${req.query.userId}`);
            // [server_logs] confirm if the item has been deleted ifnot show a warning
            user.result.n > 0 ? console.log(`[SUCCESS] deletion confirmed`) : console.log(`[WARNING] No item deleted. Bad userId ? (${id})`);
            return res.status(200).json({ user });
        } catch (err) {
            // [server_logs]
            console.log(`[FAILED] DELETE user with id : ${id} : `);
            console.log(`Error response : \n${err}`);
            return res.status(404).json({ err });
        }
    };

    const getRoute = async (req, res) => {
        switch (req.method) {
            case 'DELETE':
                return await deleteUser((req.query.userId).toString());
            default:
                res.status(405).end('Method Not Allowed');
                break;
        }
    }

    return getRoute(req, res)
}
