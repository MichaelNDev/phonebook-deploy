import React from 'react'

function PersonForm({addPerson, nameValue, phoneValue, onChangeName, onChangePhone}) {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={nameValue} onChange={onChangeName}/>
        </div>
        <div>
          phone: <input value={phoneValue} onChange={onChangePhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm