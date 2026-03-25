import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  
  useEffect(() => {
    // axios.get('http://localhost:3001/persons').then(response => {
    //   const peopleList = response.data
    //   console.log(peopleList)
    //   setPersons(peopleList)
    // })

    personsService.getAll().then(peopleList => 
      setPersons(peopleList)
    )

  }, [])


  const nameInput = (event) => {
    setNewName(event.target.value)
  }

  const phoneInput = (event) => {
    setNewPhone(event.target.value)
  }

  const filterInput = (event) => {
    setNameFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      id: persons.length + 1,
      phone: newPhone
    }

    if(persons.find(x => x.name === person.name)){

      if(window.confirm(`${person.name} is already added to the phonebook, replace old number with a new one?`)){
        const existingPerson = persons.find(x => x.name === person.name)
        const updateExistingPerson = {...existingPerson, phone: person.phone}
        personsService.updatePhone(existingPerson.id, updateExistingPerson).then(returnedPersonObj => {
          setPersons(prevPersons => prevPersons.map(person => person.id === returnedPersonObj.id ? returnedPersonObj : person))
          setNewName('')
          setNewPhone('')
          setMessage(`Updated ${existingPerson.name} phone number`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        )
      } 

    } else {
      
      // setPersons(prevPersons => prevPersons.concat(person))
      // setNewName('')
      // setNewPhone('')

      personsService.addPerson(person).then(returnedPersonObj => 
        {
          setPersons(prevPersons => prevPersons.concat(returnedPersonObj))
          setNewName('')
          setNewPhone('')
          setMessage(`Added ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      )
    }
  }

  const deleteContact = (id, name) => {

      if(window.confirm(`Delete ${name} from contacts?`)){
        personsService.deletePerson(id).then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMsg(`Information of ${name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
        })
      } else {
        console.log('User chose not to delete contact')
      }
    
  }

  const updateNumber = (id, name) => {
    
    if(window.confirm(`${name} is already added to the phonebook, replace the old number with the new one?`)){
      console.log('yes')
    } else {
      console.log('User did not update existing contact')
    }

    // personsService.updatePhone(id).then()

  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMsg={errorMsg}/>
      <Filter filterName={nameFilter} onChange={filterInput}/>
      <h3>Add a new contact</h3>
      <PersonForm 
        addPerson={addPerson} 
        nameValue={newName} 
        phoneValue={newPhone}
        onChangeName={nameInput}
        onChangePhone={phoneInput}
      />
      <h2>Numbers</h2>
      <Persons personsList={persons} filterName={nameFilter} updateNumber={updateNumber} deleteContact={deleteContact}/>
    </div>
  )
}

export default App
