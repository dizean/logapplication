import React from 'react';
import './Sidebar.css';
import imagePaths from '../imagepath';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container-sidebar">
       <Link to="/Home"><img src={imagePaths.logo} alt="Logo" /></Link>
      </div>
      <div className="links-container">
        <p className="label">General</p>
        <Link to="/Keybooking" className='key'>
          <div className="icon-container">
            <img src={imagePaths.key} alt="Key Icon" />
          </div>
          Key Borrowing
        </Link>
        <Link to="/EmployeeLog" className='book'>
          <div className="icon-container">
            <img src={imagePaths.visitor} alt="Book Icon" />
          </div>
         Employee Log
        </Link>
        <Link to="/Visitorlog" className='visitor'>
          <div className="icon-container">
            <img src={imagePaths.visitor} alt="Visitor Icon" />
          </div>
          Visitor Log
        </Link>
        <Link to="/ViewEmployeeLog" className='viewemployee'>
          <div className="icon-container">
            <img src={imagePaths.addroom} alt="Add Room Icon" />
          </div>
          View Employee`s Log`
        </Link>
        <Link to="/ViewBorrowers" className='viewborrowers'>
          <div className="icon-container">
            <img src={imagePaths.addroom} alt="Add Room Icon" />
          </div>
          View Key Borrowers Log
        </Link>
        <Link to="/ViewVisitors" className='viewvisitors'>
          <div className="icon-container">
            <img src={imagePaths.addroom} alt="Add Room Icon" />
          </div>
          View Visitors Log
        </Link>
        <Link to="/Addroom" className='addroom'>
          <div className="icon-container">
            <img src={imagePaths.addroom} alt="Add Room Icon" />
          </div>
          Add Room
        </Link>
        <Link to="/CrudEmployees" className='crudemployee'>
          <div className="icon-container">
            <img src={imagePaths.addroom} alt="Add Room Icon" />
          </div>
          CRUD Employee
        </Link>
      </div>
      <div className="logout-container">
      <Link to="/Signin" className='signout'>
          <div className="icon-container">
            <img src={imagePaths.logout} alt="Logout Icon" />
          </div>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
