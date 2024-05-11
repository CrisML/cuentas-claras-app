
import * as mongoDB from "mongodb";


// This should be read from a .env file.
// const uri =
// "mongodb+srv://grupo18:kcr9HdbBcsIkszGk@cluster0.rf75zii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri =
"mongodb+srv://grupo18:kcr9HdbBcsIkszGk@cluster0.rf75zii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongoDB.MongoClient(uri);
client.connect();
const database = client.db("cuentasclaras")
export const spendingGroupsCollection: mongoDB.Collection = database.collection("spendings");
