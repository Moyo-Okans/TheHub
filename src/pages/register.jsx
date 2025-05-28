import React, { useState } from 'react';
import '../style/register.css';
import GoogleIcon from '../assets/google.png';
import FaceBookIcon from '../assets/facebook.png';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../api';  // Adjust the path as necessary

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // important!
    console.log(fullName, email, password)
    const data = {
      fullname: fullName,
      email: email,
      password: password,
    };

    try {
      const response = await api.post('/users/signup', data);
      localStorage.setItem("token",response.data.token)
      console.log(localStorage.getItem('token'));
      console.log('Registration successful:', response.data);
       navigate('/dashboard');
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
        <input type="text" name="fullName" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input type="email" name="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="password" style={{ width: '50%', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            style={{ width: '100%', paddingRight: '40px' }}
            required value={password} onChange={(e) => setPassword(e.target.value)}
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
        <button onClick={handleRegister} className='signUpBtn' type="submit">Sign Up</button>



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

export default Register;
