const { MongoClient,ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient( process.env.MONGO_URL );

DBwrite = async (data) => {
    
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('biology');
    const result = await collection.insertMany(data)

    return result;
}

DBreadByID = async (searchID) => {
    console.log('inside DBreadByID')
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('biology');

    const result = await collection.find({ _id : new ObjectId(searchID) }).toArray()

    return result;
}
module.exports = {DBwrite,DBreadByID}