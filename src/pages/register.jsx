import React from 'react'
import logo from '../assets/profileImage.jpg';

function register() {
  return (
    <div>
        <img src={logo} alt="" className="logo" />
        <h3 className='signUp'>Signup</h3>
    </div>
  )
}

export default register