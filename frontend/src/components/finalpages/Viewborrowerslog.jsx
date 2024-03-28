import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHome from './Navbar';
import { Link } from 'react-router-dom';
import '../finalpages/viewemployee.css';
// import { useUser } from '../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const ViewLogBorrowers = () => {
    // const { user } = useUser(); 
    // const [borrow, setBorrow] = useState({
    //     room_id: '',
    //     room:'',
    //     date: '',
    //     name_borrower: '',
    //     time_borrowed: '',
    //     name_returner: '',
    //     time_returned: '',
    //     status: '',
    //   });
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [showBorrowers, setshowBorrowers] = useState(true); 
        const [borrowerData, setBorrowerData] = useState([]);
        const [startDate,setStartDate]= useState(new Date());
        const [endDate,setEndDate]= useState(new Date());
        const [filteredData, setFilteredData] = useState([]);
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
        
        const handleSelect = async (date) => {
          const response = await axios.get('http://localhost:3002/borrow/');
          const filtered = response.data.filter((borrow) => {
            const borrowDate = new Date(borrow.date);
            borrowDate.setHours(0, 0, 0, 0); 
            const selectedStartDate = new Date(date.selection.startDate);
            selectedStartDate.setHours(0, 0, 0, 0); 
            const selectedEndDate = new Date(date.selection.endDate);
            selectedEndDate.setHours(23, 59, 59, 999);
            return borrowDate >= selectedStartDate && borrowDate <= selectedEndDate;
          });
          
          setStartDate(date.selection.startDate);
          setEndDate(date.selection.endDate);
          setSearchResults(filtered);
          setFilteredData(filtered);
          setSearchTerm('');
        };
      
        const selectionRange = {
          startDate: startDate,
          endDate: endDate,
          key: 'selection',
        };
        
        const handleSearch = async (value) => {
          try {
            if (!filteredData.length){
              const response = await axios.post(`http://localhost:3002/borrow/search`, { searchTerm });
              const today = new Date().toISOString().split('T')[0];
              const filteredResults = response.data.filter(borrow => {
                if (searchTerm) {
                  return borrow.date === today;
                } else {
                  return borrow.date === today;
                }
              });
              setSearchResults(filteredResults);
            }
            else{
              const roomfiltered = filteredData.filter(rooms =>
                rooms.room.toUpperCase().includes(searchTerm.toUpperCase())
              );
              // const roomfiltered = filteredData.filter(rooms =>
              //   rooms.room.toUpperCase() === searchTerm.toUpperCase()
              // );
              
                setSearchResults(roomfiltered);
                console.log('sa search ni '+ value);
                console.log(roomfiltered);
          } }catch (error) {
            console.error('Error searching users:', error);
          }
        };
        
        const handleResetSearch = async () => {
          try {
            if (!filteredData.length){
            const response = await axios.get('http://localhost:3002/borrow/');
            const today = new Date().toISOString().split('T')[0];
            const filteredResults = response.data.filter(borrow => borrow.date === today);
            setSearchResults(filteredResults);
            setshowBorrowers(true);
            }
            else{
              const roomfiltered = filteredData.filter(rooms => rooms.room === searchTerm);
              console.log('secondcondition')
              setSearchResults(roomfiltered);
              setshowBorrowers(false);
            }
          } catch (error) {
            console.error('Error fetching all users:', error);
          }
        };
        const handleInputChange = (e) => {
          const value = e.target.value;
          setSearchTerm(value);
          console.log('sa handle ni  '+ value);
          if (value === '') {
            handleResetSearch();
            setSearchResults(filteredData)
          } else {
            handleSearch(value);
          }
        };
        const today = new Date().toISOString().split('T')[0];
    return (
        <div className='viemployeelog'>
            <NavHome/>
            <div className='data-content'>
            <div className='title'>
              <div className='t-left'> 
                Key Borrowers / Returners Log
                </div>
              <div className='t-right'>
                    <Link to='/Borrow'>
                    <button>
                        Go to Borrow / Return Room Key
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
                    filename={"Key Borrowers/Returners Log, Date - " + today}
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
                    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
            <div className="data-grid">
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
    )
}

export default ViewLogBorrowers;
