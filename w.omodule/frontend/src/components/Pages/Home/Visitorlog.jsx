import React, { useState } from 'react';
import axios from 'axios';
import './Visitorlog.css';
import imagePaths from '../imagepath';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useUser } from '../../jsx/userContext';
const VisitorLog = () => {
  const { user } = useUser();
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
      alert('Pasudla nato');
    } catch (error) {
      alert('error');
      console.error('data data:', error);
    }
  };

  const handleChange = (e) => {
    Setvisits({ ...visits, [e.target.name]: e.target.value });
  };

    return (
      <div className="visitor-log-container">
        <Sidebar/>
        <div className="visitor-log-logo">
          <Link to="/Home"><img src={imagePaths.logo} alt="Logo" /></Link>
        </div>
        <div className="visitor-log-content">
          <h1>Log Visitor</h1>
          <form className="visitor-log-form" onSubmit={handleSubmit}>
            <div className="visitor-log-form-group">
            </div>
            <div className="visitor-log-form-group">
              <label className="visitor-log-label" htmlFor="name">
                Name:
              </label>
              <input className="visitor-log-input" type="text" id="name" name="name" value={visits.name} onChange={handleChange} required />
            </div>
            <div className="visitor-log-form-group">
              <label className="visitor-log-label" htmlFor="purpose">
                Purpose:
              </label>
              <input className="visitor-log-input" type="text" id="purpose" name="purpose" value={visits.purpose} onChange={handleChange} required />
            </div>
            <div className="visitor-log-form-group">
              <label className="visitor-log-label" htmlFor="place">
                Place to visit:
              </label>
              <input className="visitor-log-input" type="text" id="place" name="place" value={visits.place} onChange={handleChange} required />
            </div>
            <button className="visitor-log-button" type="submit">
              Log
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  
  export default VisitorLog;