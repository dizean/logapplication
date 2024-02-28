import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css'
import { Link, useNavigate } from "react-router-dom";
import LOGO from '../../images/lcc-logo.png';
import { useUser } from '../jsx/userContext';

import iconemploy from '../../images/icon-employ.png';
const DashBoard = () => {
    const { user } = useUser();
    const [openVisit, setOpenvisit] = useState(false);
    const openModalVisit = () => {
        setOpenvisit(true);
      };
      const closeModal = () => {
        setOpenvisit(false);
        
      };
      const [visits, Setvisits] = useState({
        date: '',
        name: '',
        purpose: '',
        place:''
      });
    
      // add visitor record
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3002/visits/', {
            ...visits,
            date:new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
            admin_assigned: user.username,
          });
          console.log(response.data);
          Setvisits({
            date: '',
            name: '',
            purpose: '',
            place: ''
          });
          closeModal();
        } catch (error) {
          alert('error');
          console.error('data data:', error);
        }
      };
    
      const handleChange = (e) => {
        Setvisits({ ...visits, [e.target.name]: e.target.value });
      };
    return (
        <div className='dashboard'>
           <div className="dashnav">
            <div className='d-left'>
                <img src={LOGO}/>
            </div>
            <div className='d-right'>
                <Link to='/'>
                Sign out
                </Link>
            </div>
           </div>
           <div className='dash'>
            
            <div className='employee'>

                    <div className="icon-employee-cont">
                        <div className="icon-employ">
                            <img src={iconemploy}/>
                        </div>

                        <div className="employ-title-desc">

                            <div className="title-employ">
                            <h1>Employee<br></br>Management</h1>
                            </div>
                            <div className="title-desc">
                            <p>Supporting employees through oversight, tracking, and tasks like attendance monitoring, performance evaluation, and record-keeping.</p>
                            </div>
                            
                           
                        </div>
                    </div>
          
            <div className='links'>
                <div className='log'>
                    
                    <Link to='/LogEmployee'>
                    <button>
                    Log Employee
                    </button>
                    </Link>
                    
                    
                </div>
                <div className='crud'>
                <Link to='/CRUDEmployees'>
                    <button>
                    Create, Update, Delete Employee Information
                    </button>
                    </Link>
                   
                </div>
                <div className='view'>
                <Link to='/ViewEmployeeLog'>
                <button>
                        View Employees Log
                    </button>
                    </Link>
                    
                </div>
            </div>
            </div>



            <div className='rooms'>
            <div className="title">
                
            </div>
            <div className='links'>
                <div className='log'>
                <Link to='/Borrow'>
                <button>
                    Borrow/Return Room Key
                    </button>
                    </Link>
                    
                    
                </div>
                <div className='crud'>
                <Link to='/CRUDrooms'>
                <button>
                    Create, Update, Delete Room Information
                    </button>
                    </Link>
                   
                   
                </div>
                <div className='view'>
                <Link to='/BorrowLog'>
                <button>
                        View Borrowers Log
                    </button>
                    </Link>
                    
                </div>
            </div>
            </div>
            <div className='visitor'>
            <div className="title">
               
            </div>
            <div className='links'>
                <div className='log'>
                <Link onClick={openModalVisit}>
                <button>
                    Log Visitors
                    </button>
                    </Link>
                   
                    
                </div>
                <div className='view'>
                <Link to='/Visitorslog'>
                <button>
                        View Visitors Log
                    </button>
                    </Link>
                    
                </div>
            </div>
            </div>
           </div>
           {openVisit &&
            (
                <>
                  <div className="modalvisit">
                <div className='visitform'>
                    <h1>Fill up Form</h1>
                    <div className="name">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type='text' name='name' value={visits.name} onChange={handleChange} required>

                        </input>
                    </div>
                    <div className="purpose">
                        <label htmlFor="purpose">
                            Purpose
                        </label>
                        <input type='text' name='purpose' value={visits.purpose} onChange={handleChange} required>

                        </input>
                    </div>
                    <div className="purpose">
                        <label htmlFor="place">
                            Place to Visit
                        </label>
                        <input type='text' name='place'value={visits.place} onChange={handleChange} required>

                        </input>
                    </div>
                    <div className="buttons">
                        <button className='log' onClick={handleSubmit}>
                            Log Visitor
                        </button>
                        <button className='cancel' onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
                </>
            )}
        </div>
    )
}

export default DashBoard;
