import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHome from './Navbar';
import { Link } from 'react-router-dom';
import '../finalpages/viewemployee.css';
import { useUser } from '../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const ViewLogVisitors = () => {
    const { user } = useUser(); 
    const [visits, Setvisits] = useState({
        date: '',
        name: '',
        purpose: '',
        place:''
      });
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showVisitors, setshowVisitors] = useState(true);
      const [visitorsData, setVisitorsData] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get('http://localhost:3002/visits/');
            const today = new Date().toISOString().split('T')[0];
            const filteredData = response.data.filter(visits => visits.date === today);
            setVisitorsData(filteredData);
            setSearchResults(filteredData);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
        };
        fetchData();
      }, []);
      
      const handleSearch = async () => {
        try {
          const response = await axios.post(`http://localhost:3002/visits/search`, { searchTerm });
          const today = new Date().toISOString().split('T')[0];
          const filteredResults = response.data.filter(visits => {
            if (searchTerm) {
              return visits.date === today;
            } else {
              return visits.date === today;
            }
          });
      
          setSearchResults(filteredResults);
          setshowVisitors(false);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };
      
      const handleResetSearch = async () => {
        try {
          const response = await axios.get('http://localhost:3002/visits/');
          const today = new Date().toISOString().split('T')[0];
          const filteredData = response.data.filter(visits => visits.date === today);
          setSearchResults(filteredData);
          setshowVisitors(true);
        } catch (error) {
          console.error('Error fetching all users:', error);
        }
      };
      
      const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
      
        if (value === '') {
          handleResetSearch();
        } else {
          handleSearch();
        }
      };
      const handleChange = (e) => {
        Setvisits({ ...visits, [e.target.name]: e.target.value });
      };
      const today = new Date().toISOString().split('T')[0];
    return (
        <div className='viemployeelog'>
            <NavHome/>
            <div className='data-content'>
            <div className='title'>
              <div className='t-left'> 
                Visitors Log
                </div>
              <div className='t-right'>
                    <Link to='/Dashboard'>
                    <button>
                        Go Back to main
                    </button>
                    </Link>
                    </div>
            </div>
            <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by Room name or number ;"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
                    <ReactHTMLTableToExcel
                    id="download-table-button"
                    className="download-table-xls-button"
                    table="tableemplo"
                    filename={"Visitors Log, Date - " + today}
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
            <div className="data-grid">
            <table id= "tableemplo" className="styled-table">
                        <thead>
                        <tr>
                            <th>Date of Visit</th>
                            <th>Name</th>
                            <th>Purpose</th>
                            <th>Place to Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((visits, index) => (
                            <tr key={index}>
                                <td>{visits.date}</td>
                                <td>{visits.name}</td>
                                <td>{visits.purpose}</td>
                                <td>{visits.place}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
            </div>
            </div>
            
        </div>
    )
}

export default ViewLogVisitors;
