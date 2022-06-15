import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGO_DB_URI) {
  throw new Error(
    "L'uri de la base de donnée n'a pas été trouvé dans .env.local"
  );
}

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  // Dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Prod
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
