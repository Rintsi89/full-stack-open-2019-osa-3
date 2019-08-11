const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Token named 'type' is used for person's name.

const clearToken = () => morgan.token('type', () => "")
clearToken()

app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"))

app.use(bodyParser.json())

let persons = [
        {
            name: "Ada Lovelace",
            number: "12 43324",
            id: 1
        },
        {
            name: "Dan Abramov",
            number: "121 121",
            id: 2
        },
        {
            name: "Mary Poppendieck",
            number: "213 213123",
            id: 3
        },
        {
            name: "Michael Jackson",
            number: "041 0651",
            id: 4
        },
        {
            name: "James Bond",
            number: "007-007-007",
            id: 5
        }
    ]

app.get('/info', (req, res) => {
    const date = new Date().toString()
    const personsQty = persons.length

    res.send(`<p>Phonebook has info for ${personsQty} people</p>
    <p>${date}</p>`)

    clearToken()
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
    clearToken() 
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

    clearToken()
})

const generateID = () => Math.floor(Math.random() * 500)

app.post('/api/persons', (req, res) => {

    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'Both name and number are mandatory!'
        })
    } else if (persons.some(person => person.name.toLowerCase() === req.body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'Name must be unique!'
        })
    }

    const person = {
        name: req.body.name,
        number: req.body.number,
        id: generateID()
    }

    morgan.token('type', () => JSON.stringify(person))
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
    clearToken()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})