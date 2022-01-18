import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default function users(req, res) {
  const getUsers = async (res) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const users = await db.collection("users").find({}).toArray();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const addUser = async (res) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const user = await db.collection("users").insertOne({
        lastName: "LaGarde",
        firstName: "Nicolas",
        email: "nicolas.lagarde@trucmail.com",
        password: "leaXoom2roo",
        md5Password: "d5ddbe83968b982548e554e2575e8e6f",
        sha1Password: "c4e251befcd6ac07a5ff4c076e9396688d4cc0c3",
        enabled: false,
        profilePic: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/78277b82-d00c-4a93-af00-d3387a443835/defaultProfilePic.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220114T182340Z&X-Amz-Expires=86400&X-Amz-Signature=9910b9146413a9fb9f3c5dbda13a77d984adaab689354ae44f77224a2c9c56f1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22defaultProfilePic.png%22&x-id=GetObject",
        role: ObjectId("61e165463d88f191f3f4e0d4"),
        isValidated: false
      });
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };
  const deleteUser = async (res) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const user = await db.collection("users")
          .deleteOne({_id: ObjectId("61e1d3286334f038c10c5c04")});
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (method, req, res) => {
    switch (method) {
      case "GET": {
        return await getUsers(res);
      }
      case "POST": {
        return await addUser(res);}
      case "DELETE": {
        return await deleteUser(res);
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };
  return getRoute(req.method, req, res);
}
