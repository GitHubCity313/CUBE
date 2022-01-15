// export default function handler(req, res) {
//     const { slug } = req.query
//     // console.log(req.query)
//     console.log(req.method)
//     res.end(`User: ${ req.query.userId }`)
// }
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
            console.log(`[SUCCESS] DELETE user with id : ${req.query.userId}`);
            console.log(res.status(200).json({ user }))
            return res.status(200).json({ user });
        } catch (err) {
            console.log(`[FAILED] DELETE user with id : ${req.query.userId}`);
            return res.status(404).json({ err });
        }
    };

    const getRoute = async (req, res) => {
        switch (req.method) {
            case 'GET':
                res.end(`UserId: ${req.query.userId}`)
                break;
            case 'DELETE':
                return await deleteUser((req.query.userId).toString());
            default:
                res.status(405).end('Method Not Allowed');
                break;
        }
    }

    return getRoute(req, res)
}
