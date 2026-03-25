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
        minLength: 3,
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// By default mongoose validators are off for update operations, this turns it on
// when on, our frontend can receive error response from update operations
personSchema.set('validateBeforeSave', true)

module.exports = mongoose.model("Person", personSchema)