require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
// morgan.token creates a custom token of your liking
// For example 'body' represents :body
// the CB function expects to return a string
// FSO wants us to return the posted person object as a string
// hence JSON.stringify(req.body)
// IN GENERAL DO NOT LOG SENSITIVE DATA LIKE OBJECTS POSTED
morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const date = new Date()


app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findById(id).then(person => {
        if(person){
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
    
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<h1>Phonebook has info for ${persons.length} people</h1><br /><p>${date}</p> `)
    })
})

app.post('/api/persons', (request, response, next) => {

    const body = request.body
    if(!body.name || !body.phone){
        return response.status(400).json({ error: 'missing name or phone number' })
    }

    const person = new Person({
        name: body.name,
        phone: body.phone
    })
    
    person.save().then(addedPerson => {
        response.json(addedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, phone } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if(!person){
                return response.status(404).end()
            }
            
            person.name = name
            person.phone = phone

            return person.save().then((updatePerson) => {
                response.json(updatePerson)
            })
        })
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

// This middleware is placed after our routes to direct users from unknown endpoints
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    // CastError is the error where id requested isn't mongodb structured
    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})