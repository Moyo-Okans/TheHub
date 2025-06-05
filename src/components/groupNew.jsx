import React from 'react'
import emptyGroup from '../assets/empty.png'

function GroupNew() {
  return (
    <div className='newGroupContainer'>
        <img className='newGroupImage' src={emptyGroup} />
        <h1>No Folders Found</h1>
        <p>Click the create button now to add a new folder to your hub</p>
    </div>
  )
}

export default GroupNew