const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

// my custom modules
const path = require('node:path');
const { getHTML } = require( path.resolve( __dirname,'modules/HTML_scraping.js') );

//--##--##--##--##--## Connecting to the database (mongo)


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
    const data = req.body
    
    console.clear()

    getHTML('https://www.naturfoto.cz/vyhledat/?retezec_search=koz%C3%A1k+b%C5%99ezov%C3%BD&hledat.x=0&hledat.y=0&photoid=')

})

app.get('/', (req,res) => {
    res.send('listening')
})

app.listen(3000, () => {
    console.warn('server is listening on port 3000')
})