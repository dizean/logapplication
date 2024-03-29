import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../jsx/userContext';
import './Signup.css';
import imagePaths from '../imagepath';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  // const { loginUser } = useUser();
  const [admin, Setadmin] = useState({
    username: '',
    password: '',
  });

  //adduser
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Admin state:', admin);
    console.log('nagkadto na di');
    try {
      const response = await axios.post('http://localhost:3002/admin/', admin);
      console.log(response.data);
      // loginUser(admin.username);
      navigate('/Home');
    } catch (error) {
      console.error('data data:', admin);
      console.error('data data:', error);
    }
  };

  const handleChange = (e) => {
    Setadmin({ ...admin, [e.target.name]: e.target.value });
  };
  
    return(
        <div className="signup-container">
      <form className="left-column" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src={imagePaths.logo} alt="Logo" />
        </div>
        <h1>Create your account</h1>
        <p>Join our community and experience the power of seamless security with LogFlow!</p>
        <div className="input-container">
          <div className="input-field">
          <input type="text" name="username" placeholder='Username' value={admin.username} onChange={handleChange} />
          </div>
          <div className="input-field">
          <input type="password" name="password" placeholder='Password' value={admin.password} onChange={handleChange} />
          </div>
        </div>
        <button>Sign up</button>
        <Link to="/Signin"><p className='loginlink-signin'>Already have an account? <span>Sign in here</span></p></Link>
      </form>
      <div className="right-column">
      </div>
    </div>
    )
}

export default Signup;