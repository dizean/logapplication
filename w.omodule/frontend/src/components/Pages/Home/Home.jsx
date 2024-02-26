import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import imagePaths from '../imagepath';
import { useUser } from '../../jsx/userContext';

const Home = () => {
  const { user } = useUser();
  console.log('this data:' + user.username);
  return (
    <div className="home-wrapper">
      <Sidebar />
      <div className='parent-home-container'>
        <div className="home-container">
            <img src={imagePaths.logo2} alt="Left Image" className="image-container"/>
          <h1>Welcome to log flow</h1>
          <p className='subhead'>Secure Access, Seamless Management.</p>
          <p className='systeminfo'>comprehensive solution designed to streamline and enhance your facility management 
          processes. This software provides a robust and secure system for managing access to your premises, maintaining 
          an accurate log of key movements, and facilitating seamless room reservations. With advanced features such as 
          real-time key tracking, detailed visitor logs, and an intuitive room booking interface, our software ensures a 
          heightened level of security and efficiency. Say goodbye to manual logbooks and cumbersome administrative tasks – 
          our solution automates the entire process, allowing you to focus on what matters most.
          Elevate your facility management experience with log flow that adapts to your unique needs.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
