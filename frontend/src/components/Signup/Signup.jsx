import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from '../jsx/userContext';
import lccb from '../../images/lccb.png';
import lcc from '../../images/Site-Thumbnail.webp';
import lccp from '../../images/lcc.jpg'
const Signup = () =>{
    const navigate = useNavigate();
  // const { loginUser } = useUser();
    const [admin, Setadmin] = useState({
        username: '',
        password: '',
    });

    //adduser
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:3002/admin/', admin);
        console.log(response.data);
        // loginUser(admin.username);
        navigate('/home');
        } catch (error) {
        console.error('data data:', admin);
        console.error('data data:', error);
        }
    };

  const handleChange = (e) => {
    Setadmin({ ...admin, [e.target.name]: e.target.value });
  };
    return(
    <div className='flex w-full h-screen'>
      <form onSubmit={handleSubmit} className='w-1/2 flex flex-col justify-center px-52 gap-3 bg-slate-100' autoComplete="off">
        <div className="logo-container-signin ">
            <img src={lccb} alt="lccb" />
        </div>
        <h1 className='text-5xl pt-4'>Create an account</h1>
        <p className='pb-4'>Welcome back! Experience the power of seamless security.</p>
        <div className="input-container-signin flex flex-col gap-y-4 py-6">
          <input type="text" 
          className='rounded-md h-16 p-3 border-solid border-2 shadow-[rgba(0,0,1,0.2)_3px_4px_2px_0px] focus:shadow-[rgba(0,0,10,0.5)_3px_4px_4px_0px] focus:outline-none transition duration-75' 
          name="username" 
          placeholder='Username'
          value={admin.username}
          onChange={handleChange}/>
          <input type="password" 
          className='h-16 rounded-md p-3 border-solid border-2 shadow-[rgba(0,0,1,0.2)_3px_4px_2px_0px] focus:shadow-[rgba(0,0,10,0.5)_3px_4px_4px_0px] focus:outline-none transition duration-75' 
          name="password" 
          placeholder='Password'
          value={admin.password}
          onChange={handleChange} />
        </div>
        <button className='bg-blue-700 p-3 rounded-lg text-white'>Sign up</button>
        <Link to="/"><p className='loginlink-signin'>Already have an account? <span className='text-blue-700'>Sign in here</span></p></Link>
      </form>
      <div className='right-column-signin object-cover h-screen w-1/2 bg-blue-200'>
        <img src={lccp} className='h-screen w-screen object-cover' alt="lcc" />
      </div>
    </div>
    )
}

export default Signup;