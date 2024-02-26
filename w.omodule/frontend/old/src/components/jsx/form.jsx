import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../jsx/userContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const UserForm = () => {
  const { user } = useUser();
  console.log('this data:' + user.username);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await axios.post('http://localhost:3002/admin/logout');
      
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <>
      <Link to='/borrow'>Key Borrowing</Link>
      <Link to='/book'>Room Booking</Link>
      <Link to='/visit'>Visitor Log</Link>
      <Link to='/addroom'>Add Room</Link>
      <Link onClick={handleLogout}>Log Out</Link>
    </>
  );
};

export default UserForm;