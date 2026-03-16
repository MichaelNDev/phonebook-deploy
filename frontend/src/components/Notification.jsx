import React from 'react'

function Notification({message, errorMsg}) {
  return (
    <div>
        {message && <p className='notification'>{message}</p>}
        {errorMsg && <p className='errorNotification'>{errorMsg}</p>}
    </div>
  )
}

export default Notification