import React, { useState } from 'react';
import '../style/login.css';
import '../style/register.css';
import GoogleIcon from '../assets/google.png';
import FaceBookIcon from '../assets/facebook.png';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(email, password)
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await api.post('/users/login', data); // Use the correct endpoint
      localStorage.setItem("token", response.data.token)
      console.log(localStorage.getItem('token'));

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

        <input type="email" placeholder='Email Address' required value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="password" style={{ width: '50%', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            required
            value={password} onChange={(e) => setPassword(e.target.value)}
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
        <p className='signIn'>
          <Link to="/register">Forgot Password?</Link>
        </p>
        <button onClick={handleLogin} className='signUpBtn'>Sign In</button>

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
          <p className='copy'>&copy; {new Date().getFullYear()}</p>
        </div>
        <div className="first first1">
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
