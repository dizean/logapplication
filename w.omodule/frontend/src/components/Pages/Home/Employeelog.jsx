import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Keybooking.css';
import Sidebar from "./Sidebar";
import { useUser } from '../../jsx/userContext';

const EmployeeLog = () => {
    const { user } = useUser();
    // const [employees, Setemployees] = useState({
    //   name: '',
    //   department: '',
    //   status: ''
    // });
    const [employeelog, Setemployeelog] = useState({
      date: '',
      name: '',
      time_in: '',
      time_out: '',
      admin_assigned: '',
      employee_id: '',
      status:''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showEmployees, setshowEmployees] = useState(true);
    const [employeesData, setEmployeesData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try { 
          const employeesresponse = await axios.get('http://localhost:3002/employees/');
          setEmployeesData(employeesresponse.data);
          setSearchResults(employeesresponse.data);
          
          
            const employeeresponse = await axios.get('http://localhost:3002/employee/'
            
            );
            setEmployeeData(employeeresponse.data);
          
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
      
      fetchData();
    }, [selectedEmployee]);
    
    const handleIn = async (selectedEmployee) => {
      console.log("Selected Employee:", selectedEmployee.id); 
      setSelectedEmployee(selectedEmployee);
      if (!selectedEmployee) {
        console.error('No employee selected');
        return;
      }
      try {
        const recordEmployee = {
          date: new Date().toISOString().split('T')[0],
          employee_id: selectedEmployee.id,
          name: selectedEmployee.name,
          time_in: new Date().toLocaleTimeString(),
          time_out: '',
          admin_assigned: user.username,
          status: 'In'
        };
       
        const response = await axios.post('http://localhost:3002/employee/', recordEmployee);
        alert('Successful');
        const updateEmployee = {
          ...selectedEmployee,
          work_status: 'Active'
        };
        await axios.put(`http://localhost:3002/employees/${selectedEmployee.id}`, updateEmployee);

        alert('Successfuller');
        console.log(response.data);
      } catch (error) {
        console.error('Error logging employee:', error);
      }
    }

    const handleOut = async (selectedEmployee) => {
      try {
        if (!selectedEmployee) {
          alert('No employee selected.');
          return;
        }
    
        const updateEmployee = {
          ...selectedEmployee,
          work_status: 'Inactive'
        };
    
        await axios.put(`http://localhost:3002/employees/${selectedEmployee.id}`, updateEmployee);
    
        const employeeToUpdate = employeeData.find(employee => 
          employee.employee_id === selectedEmployee.id && employee.status === 'In' && employee.time_out === ''
        );
    
        if (!employeeToUpdate) {
          alert('No active log found for the selected employee.');
          return;
        }
    
        const updatedEmployeeLog = {
          ...employeeToUpdate,
          time_out: new Date().toLocaleTimeString(),
          status: 'Out',
        };
    
        await axios.put(`http://localhost:3002/employee/${employeeToUpdate.id}`, updatedEmployeeLog);
    
        const updatedEmployeeData = employeeData.map(employee => 
          employee.id === employeeToUpdate.id ? updatedEmployeeLog : employee
        );
    
        setEmployeeData(updatedEmployeeData);
    
        alert('Employee signed out successfully.');
      } catch (error) {
        console.error('Error handling sign out:', error);
      }
    };
    
    
    
    
    
    

    const handleSearch = async () => {
      try {
        const response = await axios.post(`http://localhost:3002/employees/search`, { searchTerm });
        setSearchResults(response.data);
        setshowEmployees(false);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };
    const handleResetSearch = async () => {
      try {
        const response = await axios.get('http://localhost:3002/employees/');
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
    // const handleChange = (e) => {
    //   Setemployees({ ...employees, [e.target.name]: e.target.value });
    // };
    return (
        <>
            <div className="home-wrapper">
                <Sidebar />
            </div>
            <div className='parent-home-container'>
            <div className="home-container-keybooking">
                    <h1 className="labelrooms">Employee`s Log</h1>
                    {/* <button  onClick={() => handleInOpen()}>Log Employee</button> */}
                    <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by name of employee "
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                    </div>
                    <div className="room-grid">
                    {searchResults.map((employees) => (
                        <div className="room-box" key={employees.id}>
                            <h1>{employees.name}</h1>
                            <h3>{employees.department}</h3>
                            <p>{employees.status}</p>
                            <button
                            className="returnbttn"
                            onClick={() => handleIn(employees)}
                            disabled={employees.work_status === 'Active'}
                            >
                            Sign In
                            </button>
                            <button
                            className="borrowbtn"
                            onClick={() => handleOut(employees)}
                            disabled={employees.work_status === 'Inactive'}>
                            Sign Out
                            </button>
                        </div>
                    ))}
                    </div>
                </div> 
            </div>
        </>
    )
}

export default EmployeeLog;
