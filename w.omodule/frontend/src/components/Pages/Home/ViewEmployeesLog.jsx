import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tables.css';
import Sidebar from "./Sidebar";
import { useUser } from '../../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ViewEmployeeLog = () => {
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
          setSearchResults(response.data);
          setshowEmployees(false);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };
      
      const handleResetSearch = async () => {
        try {
          const response = await axios.get('http://localhost:3002/employee/');
          setSearchResults(response.data);
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
    return (
        <>
            <div className="home-wrapper">
                <Sidebar />
            </div>
            <div className='parent-home-container'>
            <div className="home-container-keybooking">
                    <h1 className="labelrooms">Employee`s Log</h1>
                    <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by name of employee "
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                    </div>
                    <ReactHTMLTableToExcel
                    id="download-table-button"
                    className="download-table-xls-button"
                    table="tableemplo"
                    filename={"Employee Log" + Date()}
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
                    <div className="table-data">
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
        </>
    )
}

export default ViewEmployeeLog;
