const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

// my custom modules
const path = require('node:path');
const { getHTML } = require( path.resolve( __dirname,'modules/HTML_scraping.js') );

//--##--##--##--##--## Setting up the server
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adresses of the server
app.get('/api', (req,res) => {
    res.send('hello')
})

app.post('/form', (req,res) => { // getting data from user

    console.clear()

    //--##--##--##--##--## Connecting to the database (mongo) & saving dasta from the user
    MongoClient.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;
        
        var dbo = db.db(process.env.MONGO_DB); // connectins to a specific database in a system
        var data = [{ // the data to be send
            name: req.body.textInput
            }];

        dbo.collection( "biology" ).insertMany(data, (db_err, db_res) => { // wrting the data into a table (colection in mangoDB) products
            if (db_err) throw db_err;
            console.log(db_res.insertedIds[0]);

            res.send(db_res.insertedIds[0]); // responding with id of the item - will be use to get to its page --- TODO: redirect to the page
            db.close();
        });
    });

    getHTML('https://www.naturfoto.cz/vyhledat/?retezec_search=koz%C3%A1k+b%C5%99ezov%C3%BD&hledat.x=0&hledat.y=0&photoid=')

})

app.get('/', (req,res) => {
    res.send('listening')
})

app.listen(3000, () => {
    console.warn('server is listening on port 3000')
})