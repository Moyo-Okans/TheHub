import React, { useState } from 'react';
import '../style/register.css';
import GoogleIcon from '../assets/google.png';
import FaceBookIcon from '../assets/facebook.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='registerBox'>
      
      <div className="form">
        <img src={logo} alt="" className="logo" />
        <h3 className='signUp'>Create Account</h3>

        <div className="signupOptions">
          <button>
            <img src={GoogleIcon} alt="" />
            Google
          </button>
          <button>
            <img src={FaceBookIcon} alt="" />
            Facebook
          </button>
        </div>

        <div className="divider">
          <div></div>
          <p>or</p>
          <div></div>
        </div>
        <input type="text" placeholder='Full Name'/>
        <input type="email" placeholder='Email Address' />

        <div className="password" style={{ width: '50%', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            style={{ width: '100%', paddingRight: '40px' }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555',
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>
        <button className='signUpBtn'>Sign In</button>
        <p className='signIn'>
          Have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>

      <div className="footer">
        <div className="first">
          <div className="logo-text">
            <img src={logo} alt="" className="footerLogo" />
            <h3>The Hub</h3>
          </div>
          &copy; {new Date().getFullYear()} TheHub.
        </div>
        <div className="first">
          <p>Community guidelines. Terms of service</p>
        </div>
        <div className="first">
          <p>Made with love by Moyosore</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
