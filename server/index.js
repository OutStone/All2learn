const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors());

app.get('/api', (req,res) => {
    res.send('hello')
})
app.get('/', (req,res) => {
    res.send('listening')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000')
})