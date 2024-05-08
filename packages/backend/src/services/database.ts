
import * as mongoDB from "mongodb";


// This should be read from a .env file.
const uri =
"mongodb+srv://grupo18:kcr9HdbBcsIkszGk@cluster0.rf75zii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const collections: { spendingGroups?: mongoDB.Collection, users?: Array<{email: string, password: string}> } = {}

const client = new mongoDB.MongoClient(uri);
// client.connect();
const database = client.db("cuentasclaras")
const spendingsCollection: mongoDB.Collection = database.collection("spendings");
collections.spendingGroups = spendingsCollection;
// Uso un arreglo en memoria para simular una base con user y password
collections.users = [
    { email: 'admin@admin.com', password: 'admin' },
]