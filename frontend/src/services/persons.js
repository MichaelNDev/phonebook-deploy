import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'http://localhost:3001/api/persons'

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