const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')

let persons = [
    {
        "id": "1",
        "name": "King Arthur",
        "phone": "321-123123"
    },
    {
        "id": "2",
        "name": "Queen Sally",
        "phone": "327-456456"
    },
    {
        "id": "3",
        "name": "Prince Jay",
        "phone": "928-782783"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "phone": "39-23-6423122"
    }
]

const generateId = () => {
    return String(Math.random(10000))
}

const date = new Date()

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
// morgan.token creates a custom token of your liking
// For example 'body' represents :body
// the CB function expects to return a string
// FSO wants us to return the posted person object as a string
// hence JSON.stringify(req.body)
// IN GENERAL DO NOT LOG SENSITIVE DATA LIKE OBJECTS POSTED
morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if(person){
        response.json(person)
    } else {
        response.status(400).json({
            error: "person data does not exist"
        })
    }
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1><br /><p>${date}</p> `)
})

app.post('/api/persons', (request, response) => {
    const person = {
        name: request.body.name,
        phone: request.body.phone,
        id: generateId()
    }
    
    if(!person.name || !person.phone){
        return response.status(400).json({
            error: 'name and phone number must be unique'
        })
    }
    
    persons = persons.concat(person)
    console.log(persons)
    
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end()
    
})

// This middleware is placed after our routes to direct users from unknown endpoints
app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})