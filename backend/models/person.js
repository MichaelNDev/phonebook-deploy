const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, {family: 4})
        .then(result => {
            // Triggers when connection to DB is successful
            console.log('Connected to MongoDB')
        })
        .catch(error => {
            // Triggers when connection to DB has failed
            console.log('error connecting to MongoDB:', error.message)
        })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minLength: 6,
        required: true
    }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)