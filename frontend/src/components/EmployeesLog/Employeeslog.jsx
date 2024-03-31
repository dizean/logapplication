import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useUser} from '../jsx/userContext';
import lccb from '../../images/lccb.png';
import calendaricon from '../../images/calendar.png';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const EmployeesLog = () =>{
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
      const [startDate,setStartDate]= useState(new Date());
      const [endDate,setEndDate]= useState(new Date());
      const [filteredData, setFilteredData] = useState([]);
      const [filteredSearch, setFilteredSearch] = useState([]);
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
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const handleSelect = async (date) => {
        const response = await axios.get('http://localhost:3002/employee/');
        const filtered = response.data.filter((visit) => {
        const visitDate = new Date(visit.date);
        visitDate.setHours(0, 0, 0, 0); 
        const selectedStartDate = new Date(date.selection.startDate);
        selectedStartDate.setHours(0, 0, 0, 0); 
        const selectedEndDate = new Date(date.selection.endDate);
        selectedEndDate.setHours(23, 59, 59, 999); 
        return visitDate >= selectedStartDate && visitDate <= selectedEndDate;
      });
      setIsDatePickerOpen(false)
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setSearchResults(filtered);
      setFilteredData(filtered);
      setSearchTerm('');
      setIsDatePickerOpen(false);
        };
    
      const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      };
      const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
      };
    const handleSearch = async (value) => {
        try {
          if (!filteredData.length){
          const response = await axios.post(`http://localhost:3002/employee/search`, { searchTerm });
          const today = new Date().toISOString().split('T')[0];
          // filter date
          const filteredResults = response.data.filter(employee => {
            if (searchTerm) {
              return employee.date === today;
            } else {
              return employee.date === today;
            }
          });
      
          setSearchResults(filteredResults);
        }
        else{
          const employeefiltered = filteredData.filter(employee =>
            employee.name.toUpperCase().includes(searchTerm.toUpperCase())
          );
          // const roomfiltered = filteredData.filter(rooms =>
          //   rooms.room.toUpperCase() === searchTerm.toUpperCase()
          // );
          
            setSearchResults(employeefiltered);
            setFilteredSearch(employeefiltered);
            console.log('sa search ni '+ value);
            console.log(employeefiltered);
      }
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };
      const handleResetSearch = async () => {
        try {
          if (!filteredData.length){
          const response = await axios.get('http://localhost:3002/employee/');
          const today = new Date().toISOString().split('T')[0];
          const filteredResults = response.data.filter(employee => employee.date === today);
      
          setSearchResults(filteredResults);
          setshowEmployees(false);
          }
          else{
            const employeefiltered = filteredData.filter(employee => employee.name === searchTerm);
            console.log('secondcondition')
            setSearchResults(employeefiltered);
            setshowEmployees(false);
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
          setSearchResults(filteredData);
        } else {
          handleSearch(value);
        }
      };
      const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
      };
      const today = new Date().toISOString().split('T')[0];
    return(
   <body className='h-screen w-screen relative'>
   <nav className='flex justify-between items-center bg-slate-100'>
    <div className='py-6 pl-5'>
    <img src={lccb} alt="lccb"/>
    </div>
    <div>
    <Link to="/home" className='bg-blue-700 hover:bg-blue-500 py-5 px-20 text-2xl text-white rounded-lg mr-3'>
        Back to main
    </Link>
    </div>
   </nav>
   <header className='py-8 pl-5 text-5xl font-semibold'>
    Employees Log
   </header>
   <search className='w-full px-5 flex gap-3 '>
    <div className='w-2/3 flex flex-wrap gap-2'>
    <input
                type="text"
                className='bg-slate-100 w-2/5 py-4 px-5 rounded-lg focus:outline-none '
                placeholder="Search by name of employee"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <button 
        className='text-white w-2/12 h-16 flex justify-start items-center'
        onClick={toggleDatePicker}>
                   <img src={calendaricon} className='h-full object-contain p-2 bg-blue-400 hover:bg-blue-300 hover:mix-blend-overlay rounded-xl '  alt="" />
                    </button>
                    {isDatePickerOpen && (
                    <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    className='z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
                  />
                    )}
    </div>
        <log className='w-1/3 gap-4 flex justify-end'>
            <ReactHTMLTableToExcel 
            className='hover:bg-blue-500 text-white px-10 py-4  bg-blue-700 rounded-lg text-xl'
            id="download-table-button"
            table="tableemplo"
            filename={"Employee Log, Date - " + today}
            sheet="tablexls"
            buttonText="Download Log Record"
            />
        </log>
   </search>
   <main className='w-full px-5 my-5 overflow-scroll h-[60vh]'>
   <table id="tableemplo" className='text-left w-full border-separate border border-slate-200'>
    <thead className='bg-blue-700 text-left text-white sticky top-0 z-9'>
        <tr className='h-24 text-3xl'>
        <th>Date</th>
        <th>Name</th>
        <th>Logged in</th>
        <th>Logged out</th>               
        </tr>
    </thead>
    <tbody className='bg-green-300'>
    {searchResults.map((employee, index) => (
        <tr className='text-2xl h-20'>
            <td>{employee.date}</td>
            <td>{employee.name}</td>
            <td>{employee.time_in}</td>
            <td>{employee.time_out}</td>
        </tr>
    ))}
    </tbody>
   </table>
   </main>
   </body>
    )
}

export default EmployeesLog;