const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.port || 1137

//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

//API Routes




//HTML Routes
//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/', 'index.html'))
})

//Notes
app.get('./notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))