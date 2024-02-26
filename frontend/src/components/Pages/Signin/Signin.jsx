import React, { useState } from 'react';
import './Signin.css';
import imagePaths from '../imagepath';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../jsx/userContext';

const Signin = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser(); 

  const [admin, setAdmin] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/admin/login/', admin);
      console.log(response.data);
      loginUser(admin.username);

      navigate('/Dashboard');
    } catch (error) {
      alert('Login error');
      console.error('Login failed:', error);
    }
  };


  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <div className="signin-container">
      <form className="left-column-signin" onSubmit={handleSubmit}>
        <div className="logo-container-signin">
          <img src={imagePaths.logo} alt="Logo" />
        </div>
        <h1 className='text-sign'>Log in to your account</h1>
        <p>Welcome back! Experience the power of seamless security with LogFlow.</p>
        <div className="input-container-signin">
          <div className="input-field-signin">
          <input type="text" name="username" placeholder='Username' value={admin.username} onChange={handleChange} />
          </div>
          <div className="input-field-signin">
          <input type="password" name="password" placeholder='Password' value={admin.password} onChange={handleChange} />
          </div>
        </div>
        <button>Sign in</button>
        <Link to="/Signup"><p className='loginlink-signin'>Don't have an account? <span>Sign up here</span></p></Link>
      </form>
      <div className="right-column-signin"></div>
    </div>
  );
}

export default Signin;
