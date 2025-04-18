import React from 'react';
import '../style/register.css';
import GoogleIcon from '../assets/google.png';
import FaceBookIcon from '../assets/facebook.png';
import logo from '../assets/logo.png';

function register() {
  return (
    <div className='registerBox'>
        <img src={logo} alt="" className="logo" />
        <h3 className='signUp'>Sign Up</h3>
        <div className="form">
          <div className="signupOptions">
            <button>
              <img src={GoogleIcon} alt="" />
              Google</button>
            <button>
              <img src={FaceBookIcon} alt="" />
              Facebook</button>
          </div>
        </div>
    </div>
  )
}

export default register