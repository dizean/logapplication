import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tables.css';
import Sidebar from "./Sidebar";
import { useUser } from '../../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ViewBorrowers = () => {
    const { user } = useUser(); 
    const [borrow, setBorrow] = useState({
      room_id: '',
      room:'',
      date: '',
      name_borrower: '',
      time_borrowed: '',
      name_returner: '',
      time_returned: '',
      status: '',
    });
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showBorrowers, setshowBorrowers] = useState(true);
      const [borrowerData, setBorrowerData] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get('http://localhost:3002/borrow/');
            const today = new Date().toISOString().split('T')[0];
            const filteredData = response.data.filter(borrow => borrow.date === today);
            setBorrowerData(filteredData);
            setSearchResults(filteredData);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
        };
        fetchData();
      }, []);
      
      const handleSearch = async () => {
        try {
          const response = await axios.post(`http://localhost:3002/borrow/search`, { searchTerm });
          setSearchResults(response.data);
          setshowBorrowers(false);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };
      
      const handleResetSearch = async () => {
        try {
          const response = await axios.get('http://localhost:3002/borrow/');
          setSearchResults(response.data);
          setshowBorrowers(true);
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
        setBorrow({ ...borrow, [e.target.name]: e.target.value });
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
                    value={searchTerm}min_assigned
                    onChange={handleInputChange}
                />
                    </div>
                    <ReactHTMLTableToExcel
                    id="download-table-button"
                    className="download-table-xls-button"
                    table="tableemplo"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download Employee Log"/>
                    <div className="table-data">
                    <table id= "tableemplo" className="styled-table">
                        <thead>
                            <tr>
                            <th>Room</th>
                            <th>Date Borrowed</th>
                            <th>Name of Borrowers</th>
                            <th>Time Borrowed</th>
                            <th>Name of Returner</th>
                            <th>Time Returned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((borrow, index) => (
                            <tr key={index}>
                                <td>{borrow.room}</td>
                                <td>{borrow.date}</td>
                                <td>{borrow.name_borrower}</td>
                                <td>{borrow.time_borrowed}</td>
                                <td>{borrow.name_returner}</td>
                                <td>{borrow.time_returned}</td>
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

export default ViewBorrowers;
