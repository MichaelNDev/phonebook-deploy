import React from 'react'

function Persons({personsList, filterName, updateNumber, deleteContact}) {

  let filtered = personsList.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  
  return (
    <>
    {filtered.map(x => 
      <div key={x.id}>
        <li>{x.name} {x.phone}</li>
        {/* <button onClick={() => updateNumber(x.id)}>Update</button> */}
        <button onClick={() => deleteContact(x.id, x.name)}>Delete</button>
      </div>
    )}
    </>
  )
}

export default Persons