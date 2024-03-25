import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHome from './Navbar';
import { Link } from 'react-router-dom';
import '../finalpages/viewemployee.css';
import { useUser } from '../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const ViewLogVisitors = () => {
    const { user } = useUser(); 
    const [visits, Setvisits] = useState({
        date: '',
        name: '',
        purpose: '',
        place:'',
        gate:''
      });
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showVisitors, setshowVisitors] = useState(true);
      const [visitorsData, setVisitorsData] = useState([]);
      const [selectedGate, setSelectedGate] = useState('');
      const [startDate,setStartDate]= useState(new Date());
      const [endDate,setEndDate]= useState(new Date());
      // const [gateStore, setGateStore] = useState([]);
      // const [dateStore, setDateStore] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
      
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
      const handleFilterByGate = async () => {
        // const response = await axios.get('http://localhost:3002/visits/');
        if (!filteredData.length)
        {
          if (selectedGate === '') { 
            setSearchResults(visitorsData); 
          } else {
            setSearchResults(visitorsData.filter((visit) => visit.gate === selectedGate));
            console.log('firstconditionni')
          }
        }
        else{
          const filteredGate = filteredData.filter(visits => visits.gate === selectedGate);
          if (selectedGate === '') { 
            setSearchResults(visitorsData); 
          } else {
            console.log('secondcondition')
            setSearchResults(filteredGate);
          }
        }
       
      };

      const handleSelect = async (date) => {
        const response = await axios.get('http://localhost:3002/visits/');
        const filtered = response.data.filter((visit) => {
        const visitDate = new Date(visit.date);
        visitDate.setHours(0, 0, 0, 0);
        const selectedStartDate = new Date(date.selection.startDate);
        selectedStartDate.setHours(0, 0, 0, 0); 
        const selectedEndDate = new Date(date.selection.endDate);
        selectedEndDate.setHours(23, 59, 59, 999); 
        return visitDate >= selectedStartDate && visitDate <= selectedEndDate;
    });

    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setFilteredData(filtered);
    setSearchResults(filtered);
      };
    
      const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      };
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
                    placeholder="Search by Visitor name"
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
                   <div className="gate">
                        <label htmlFor="gate">
                                Gate
                        </label>
                        <select id="gate" name="gate" required className="inputroom" value={selectedGate}  onChange={(e) => setSelectedGate(e.target.value)}>
                            <option value="">Select Gate</option>
                            <option value="Galo Gate">Galo Gate</option>
                            <option value="Rizal Gate">Rizal Gate</option>
                        </select>
                        <button onClick={handleFilterByGate}>Filter By Gate</button>
                    </div>
                    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
                    <input ></input>
            <div className="data-grid">
            <table id= "tableemplo" className="styled-table">
                        <thead>
                        <tr>
                            <th>Date of Visit</th>
                            <th>Name</th>
                            <th>Purpose</th>
                            <th>Place to Visit</th>
                            <th>Gate</th>
                            </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((visits,index)=>{
                            return(
                                <tr key={index}>
                                <td>{visits.date}</td>
                                <td>{visits.name}</td>
                                <td>{visits.purpose}</td>
                                <td>{visits.place}</td>
                                <td>{visits.gate}</td>
                    </tr>
                );
              })}
                        </tbody>
                        </table>
            </div>
            </div>
            
        </div>
    )
}

export default ViewLogVisitors;
