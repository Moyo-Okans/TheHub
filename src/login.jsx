import React, { useState } from 'react';
import '../style/login.css';
import '../style/register.css';
import GoogleIcon from '../assets/google.png';
import FaceBookIcon from '../assets/facebook.png';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await api.post('/users/login', data); // Use the correct endpoint
      console.log('Login successful:', response.data);
      // Redirect to dashboard or another page after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error?.response?.data || error.message);
      setError('Login failed. Please check your credentials.'); // Set error message
    }
  };

  return (
    <div className='registerBox'>
      <div className="form">
        <img src={logo} alt="" className="logo" />
        <h3 className='signUp'>Sign In</h3>
        {error && <p className="error">{error}</p>} {/* Display error message */}

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

        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder='Email Address' required />
          <div className="password" style={{ width: '50%', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Password'
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
          <p className='signIn'>
            <Link to="/register">Forgot Password?</Link>
          </p>
          <button type="submit" className='signUpBtn'>Sign In</button>
        </form>

        <p className='signIn'>
          Don't have an account? <Link to="/register">Register</Link>
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

export default Login;
