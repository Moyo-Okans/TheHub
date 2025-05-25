import React from 'react'
import emptyGroup from '../assets/empty.png'

function FileNew() {
  return (
    <div className='newGroupContainer'>
            <img className='newGroupImage' src={emptyGroup} />
            <h1>No Files Found</h1>
            <p>Click the Upload button now to add a new file to your hub</p>
        </div>
  )
}

export default FileNew