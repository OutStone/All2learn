const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


//--##--##--##--##--## my custom modules
const path = require('node:path');
const { getHTML,notifier } = require( path.resolve( __dirname,'modules/HTML_scraping.js') );
const { DBwrite,DBreadByID } = require( path.resolve( __dirname,'modules/DB_work.js') );


//--##--##--##--##--## Setting up the server
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adresses of the server
app.get('/api', (req,res) => {
    res.send('hello')
})

app.post('/form', async (req,res) => { // getting data from user

    console.clear()

    //saving the data to DB
    var data = [{ // the data to be send
        list : req.body.textInput,
        imgs : [],
        user : null
        }];
    const result = await DBwrite(data)
    console.warn(result)
    
    getHTML('https://www.naturfoto.cz/vyhledat/?retezec_search=koz%C3%A1k+b%C5%99ezov%C3%BD&hledat.x=0&hledat.y=0&photoid=')

})
app.post('/',async (req,res) => {
    console.clear()

    // parsing the data
    var inputItems = req.body.textInput.split(',')

    inputItems = inputItems.map(element => {
      while (true) {
        if (element.startsWith(' ')) { // if the string starts with blank space it is removed
          
          element = element.slice(1,element.length)
        } else if (element.endsWith(' ')) { // if the string ends with blank space it is removed
          
          element = element.slice(0,-1)
        } else {
          break;
        }
      }
      if (!element.length == 0) { // returns element only if there is something of it left after deleting the blank spaces
        return element;
      }
    });


    // saving the data
    var data = [{ // the data to be send
        list : inputItems,
        imgs : [],
        user : null
        }];

    const result = await DBwrite(data)
    console.warn(result.insertedIds['0'].toString())
    res.redirect('/test/'+result.insertedIds['0'].toString())
})

app.get('/test/:itemID', (req,res) => {
    console.log(req.params.itemID)
    res.sendFile(path.join(__dirname, 'HTML', 'test.html'));
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
})

app.get('/JS/:name', (req,res) => {
    res.sendFile(path.join(__dirname, 'HTML/JS', req.params.name));
})

app.get('/DBwork:id', async (req,res) => {
    console.log('DBwork')
    const id = req.params.id
    console.warn(id)
    
    const data = await DBreadByID(id)
    console.log("list " + data[0].list)
    var list = data[0].list
    console.log(list)
    var toSend = []
    var count = 0
    var countForList = 0

    list.forEach((element) => {
        countForList ++
        if (element != null) { // filters wrong data
            console.log(element)
            count ++
            getHTML(element)
            notifier.on(element, (url) => { // waits for getHTML to send the result
                if (url != null) {
                    url = url.replace('nahled-','')
                    toSend.push({name: element, img:url})
                    count ++
                    console.log(toSend)

                    if (toSend.length == count && countForList == list.length) {
                        console.log("sending " + toSend)
                    
                        res.send(toSend)

                }}
            })
        }
    });

    if (toSend.length == count && countForList == list.length) { // muze se to splnit i tady - na konci by bylo treba hodne null elementu
        console.log("sending " + toSend)
    
        res.send(toSend)

    } 
})

app.listen(3000, () => {
    console.warn('server is listening on port 3000')
})
