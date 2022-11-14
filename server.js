const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.port || 3000
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');

//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

//API Routes

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(db)
})


// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})

app.delete('/api/notes/:id', (req, res) => {
    // console.log(req.params.id)
    const newDb = db.filter((note) => note.id !== req.params.id)
    console.log(newDb)
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb))
    res.json(newDb)
    // res.sendFile(path.join(__dirname, './db/db.json'))
    // window.reload()
})

//HTML Routes
//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))