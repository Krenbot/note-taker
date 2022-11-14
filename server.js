const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.port || 3000
const db = require('./db/db.json')
//Allows all notes to have a unique ID
const { v4: uuidv4 } = require('uuid');

//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

//API Routes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(db)
})

//POST /api/notes recieves a new note to save on the request body and add it to db.json, then returns new note to the client.
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})

//DELETEs notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end.
app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) => note.id !== req.params.id)
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

//App listens with front end on this port
app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))