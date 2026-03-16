import React from 'react'

function Filter({filterName, onChange}) {
  return (
    <div>
        filter: <input value={filterName} onChange={onChange}/>
    </div>
  )
}

export default Filter