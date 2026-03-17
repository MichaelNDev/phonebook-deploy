import axios from 'axios'
// url for db.json
// const baseUrl = 'http://localhost:3001/persons'

// url for local port 3001
// const baseUrl = 'http://localhost:3001/api/persons'

// url for backend deployed on render
// const baseUrl = 'https://phonebook-deploy-7jif.onrender.com/api/persons'


const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response =>
        // console.log(response.data)
        response.data
    )
}

const addPerson = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const updatePhone = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    addPerson,
    deletePerson,
    updatePhone
}