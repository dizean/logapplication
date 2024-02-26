import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHome from './Navbar';
import { Link } from 'react-router-dom';
import '../finalpages/viewemployee.css';
import { useUser } from '../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const ViewLogEmployee = () => {
    const { user } = useUser(); 
    const [employee, setEmployee] = useState({
      date: '',
      name: '',
      time_in: '',
      time_out: '',
      admin_assigned: ''
    });
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showEmployees, setshowEmployees] = useState(true);
      const [employeeData, setEmployeeData] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get('http://localhost:3002/employee/');
            const today = new Date().toISOString().split('T')[0];
            const filteredData = response.data.filter(employee => employee.date === today);
            setEmployeeData(filteredData);
            setSearchResults(filteredData);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
        };
        fetchData();
      }, []);
      
      const handleSearch = async () => {
        try {
          const response = await axios.post(`http://localhost:3002/employee/search`, { searchTerm });
      
          const today = new Date().toISOString().split('T')[0];
      
          // Filter results based on search term and date
          const filteredResults = response.data.filter(employee => {
            if (searchTerm) {
              return employee.date === today;
            } else {
              return employee.date === today;
            }
          });
      
          setSearchResults(filteredResults);
          setshowEmployees(false);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };
      
      const handleResetSearch = async () => {
        try {
          const response = await axios.get('http://localhost:3002/employee/');
          const today = new Date().toISOString().split('T')[0];
          const filteredData = response.data.filter(employee => employee.date === today);
      
          setSearchResults(filteredData);
          setshowEmployees(true);
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
        setEmployee({ ...employee, [e.target.name]: e.target.value });
      };
      const today = new Date().toISOString().split('T')[0];
    return (
        <div className='viemployeelog'>
            <NavHome/>
            <div className='data-content'>
            <div className='title'>
              <div className='t-left'>
                Employees Log
                </div>
              <div className='t-right'>
                    <Link to='/LogEmployee'>
                    <button>
                        Go to Log Employee
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
                    filename={"Employee Log, Date - " + today}
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
            <div className="data-grid">
            <table id= "tableemplo" className="styled-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Time In</th>
                            <th>Time Out</th>
                            {/* <th>admin_assigned</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((employee, index) => (
                                <tr key={index}>
                                <td>{employee.date}</td>
                                <td>{employee.name}</td>
                                <td>{employee.time_in}</td>
                                <td>{employee.time_out}</td>
                                {/* <td>{employee.admin_assigned}</td> */}
                            </tr>
                            ))}
                        </tbody>
                        </table>
            </div>
            </div>
            
        </div>
    )
}

export default ViewLogEmployee;
