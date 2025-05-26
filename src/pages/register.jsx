import React, { useState } from 'react';
import '../style/register.css';
import GoogleIcon from '../assets/google.png';
import FaceBookIcon from '../assets/facebook.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../config/axios'; // Adjust the path as necessary

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

const handleRegister = async (e) => {
  e.preventDefault(); // important!
  const formData = new FormData(e.target);
  const data = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await api.post('/users/signup', data);
    console.log('Registration successful:', response.data);
    // Redirect user or show success message
  } catch (error) {
    console.error('Registration failed:', error?.response?.data || error.message);
    // Show error to user
  }
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
<form onSubmit={handleRegister}>
  <input type="text" name="fullName" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email Address" required />
  <div className="password" style={{ width: '50%', position: 'relative' }}>
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="Password"
      style={{ width: '100%', paddingRight: '40px' }}
      required
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
  <button className='signUpBtn' type="submit">Sign Up</button>
</form>


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
