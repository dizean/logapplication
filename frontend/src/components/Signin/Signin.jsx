import React, {useState}from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from '../jsx/userContext';
import lccb from '../../images/lccb.png';
import lccp from '../../images/lcc.jpg';
import Alert from '@mui/material/Alert';
const Signin = () =>{
    const navigate = useNavigate();
    const { loginUser } = useUser(); 

    const [admin, setAdmin] = useState({
        username: '',
        password: '',
    });
    const[isError, setIsError] =useState(false);
    const ifError = () => {
      setIsError(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:3002/admin/login/', admin);
        console.log(response.data);
        loginUser(admin.username);
        navigate('/home');
        } catch (error) {
        setAdmin({
          username:'',
          password:''
        })
        ifError();
        console.error('Login failed:', error);
        }
    };

   
    
    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };
    return(
    <div className='flex w-full h-screen'>
      <form 
      onSubmit={handleSubmit} 
      className='w-1/2 flex flex-col justify-center px-32 gap-3 bg-slate-100' 
      autoComplete="off">
        <div className="logo-container-signin">
            <img src={lccb} alt="lccb"/>
        </div>

        <h1 className='text-5xl pt-4'>Log in to your account</h1>
        <p className='pb-4'>Welcome back! Experience the power of seamless security.</p>
        <div className="input-container-signin flex flex-col gap-y-4 py-6">
          <input type="text" 
          className='rounded-md h-16 p-3 border-solid border-2 shadow-[rgba(0,0,1,0.2)_3px_4px_2px_0px] focus:shadow-[rgba(0,0,10,0.5)_3px_4px_4px_0px] focus:outline-none transition duration-75' 
          name="username" 
          placeholder='Username'
          value={admin.username}
          onChange={handleChange}/>
          <input type="password" 
          className='h-16 rounded-md p-3 border-solid border-2 shadow-[rgba(0,0,1,0.2)_3px_4px_2px_0px] focus:shadow-[rgba(0,0,1,0.5)_3px_4px_4px_0px] focus:outline-none transition duration-75' 
          name="password" 
          placeholder='Password'
          value={admin.password}
          onChange={handleChange} />
          {isError &&
      (
        <>
        <Alert severity="error">
        Username or Password does not exist.
      </Alert>
        </>
      )}
        </div>
        <button className='bg-blue-700 p-3 rounded-lg text-white'>Sign in</button>
        <Link to="/signup"><p className='loginlink-signin'>Don't have an account? <span className='text-blue-700'>Sign up here</span></p></Link>
      </form>
      <div className='right-column-signin object-cover h-screen w-1/2 bg-blue-200'>
        <img src={lccp} className='h-screen w-screen object-cover' alt="lcc" />
      </div>
      
    </div>
    )
}

export default Signin;