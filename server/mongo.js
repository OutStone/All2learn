const MongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv');
dotenv.config();

MongoClient.connect(process.env.MONGO_URL, function(err, db) {
  if (err) throw err;

  var dbo = db.db(process.env.MONGO_DB);

  dbo.createCollection( "biology" , (err, res) => {
    if (err) throw err;

    console.log("Collection created!");
    db.close();
  });
});