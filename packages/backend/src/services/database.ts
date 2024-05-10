
import * as mongoDB from "mongodb";


// This should be read from a .env file.
// const uri =
// "mongodb+srv://grupo18:kcr9HdbBcsIkszGk@cluster0.rf75zii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri =
"mongodb://localhost:27017/?retryWrites=true&w=majority&appName=Cluster0";

export const collections: { spendingGroups?: mongoDB.Collection, users?: mongoDB.Collection } = {}

const client = new mongoDB.MongoClient(uri);
// client.connect();
const database = client.db("cuentasclaras")
const usersCollection: mongoDB.Collection = database.collection("users");
collections.users = usersCollection;
const spendingsCollection: mongoDB.Collection = database.collection("spendings");
collections.spendingGroups = spendingsCollection;
