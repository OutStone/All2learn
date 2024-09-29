const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

// Connection URL
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.MONGO_DB;

async function main() {

  // connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('biology');

  // writing some data so the DB will realy be created
  const data = [{
      _id : 0,
      list : ["kozák březový"],
      imgs : [],
      user : null
  }]

  const result = await collection.insertMany(data)

  console.log(result)
  client.close()

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());