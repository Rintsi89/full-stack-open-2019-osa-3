require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// Token named 'type' is used for person's name.

const clearToken = () => morgan.token('type', () => "")
clearToken()

app.use(cors())
app.use(express.static('build'))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"))
app.use(bodyParser.json())

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'Malformed id, check URL' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error})
    }

    next(error)
}

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

app.get('/info', (req, res, next) => {
    clearToken()
    Person.find({}).then(persons => {
        const date = new Date().toString()
        const personsQty = persons.length
        res.send(`<p>Phonebook has info for ${personsQty} people</p>
    <p>${date}</p>`)
    }).catch(error => next(error))   
})

app.get('/api/persons', (req, res, next) => {
    clearToken() 
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    }).catch(error => next(error))   
})

app.get('/api/persons/:id', (req, res, next) => {
    clearToken()
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        }).catch(error => next(error))
})

const generateID = () => Math.floor(Math.random() * 500)

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'Both name and number are mandatory!'
        })
    } else if (persons.some(person => person.name.toLowerCase() === req.body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'Name must be unique!'
        })
    }

    const person = new Person({
        name: req.body.name,
        number: req.body.number,
    })

    person.save().then(savedPerson => {
        morgan.token('type', () => JSON.stringify(savedPerson))
        res.json(savedPerson.toJSON())
    }).catch(error => next(error)) 
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            morgan.token('type', () => JSON.stringify(updatedPerson))
            res.json(updatedPerson.toJSON())
        }).catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    clearToken()
    Person.findByIdAndRemove(req.params.id).then(result => {
        persons = persons.filter(person => person.id !== result.id)
        res.status(204).end()
    }).catch(error => next(error))    
})

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})