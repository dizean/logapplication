import React, { useState , useEffect} from 'react';
import axios from 'axios';
import './Keybooking.css'
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const CRUDEmployees = () => {
    const navigate = useNavigate();
  const [employee, Setemployee] = useState({
    name: '',
    department: '',
    status: '',
    work_status: '',
  });

  //adduser
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recordemployee = {
        ...employee,
        work_status: 'Inactive'
      }
      const response = await axios.post('http://localhost:3002/employees/', recordemployee);
      console.log(response.data);
      navigate('/Employeelog');
    } catch (error) {
      console.error('data data:', employee);
    }
  };
  const updateEmployee = async (selectedEmployee) => {
    if(!selectedEmployee){
      alert('No selected employee');
    }
    alert(selectedEmployee.id);
    try {
      const response = await axios.put(`http://localhost:3002/employees/${selectedEmployee.id}`, employee);
      alert("Successfully updated!");
    } catch (error) {
      alert('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (selectedEmployee) => {
    try {
      const response = await axios.delete(`http://localhost:3002/employees/${selectedEmployee.id}`);
      alert("Deleted successfully!")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showEmployees, setshowEmployees] = useState(true);
      const [employeeData, setEmployeeData] = useState([]);
      const [selectedEmployee, setselectedEmployee] = useState(null);
      const [openModal,setOpenModal] = useState(false);
      useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get('http://localhost:3002/employees/');
            setEmployeeData(response);
            setSearchResults(response.data);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
        };
        fetchData();
        if (selectedEmployee) {
          Setemployee({
            name: selectedEmployee.name,
            department: selectedEmployee.department,
            status: selectedEmployee.status,
            work_status: selectedEmployee.work_status
          });
        }
      }, [selectedEmployee]);
      const showSelect =  (selectedEmployee) =>{

          setselectedEmployee(selectedEmployee);
          console.log(selectedEmployee.id);
          setOpenModal(true);
      }
      const closeModal = () => {
        setOpenModal(false);
      }
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
      const handleChange = (e) => {
        Setemployee({ ...employee, [e.target.name]: e.target.value });
      };
      
    return (
        <>
            <div className="home-wrapper">
                <Sidebar />
            </div>
            <div className='parent-home-container'>
                <div className="home-container-keybooking">
                    <h1 className="labelbooked">Add Employee</h1>
                    <form className="add-room-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label  className="name" htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required  className="inputroom" value={employee.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="department" className="department">Department:</label>
                        <select id="department" name="department" required className="inputroom" value={employee.department} onChange={handleChange}>
                            <option value="">Select Department</option>
                            <option value="SBIT">School of Business and Information Technology (SBIT)</option>
                            <option value="SARFRAID">School of Fine Arts, Architecture and Interior Design (SARFRAID)</option>
                            <option value="SHTM">School of Hospitality and Tourism Management (SHTM)</option>
                            <option value="SSLATE">School of Sciences, Liberal Arts and Teacher Education (SSLATE)</option>
                        </select>
                      </div>
                      <div className="form-group">
                      <label htmlFor="status" className="status">Status:</label>
                      <select id="status" name="status" required className="inputroom" value={employee.status} onChange={handleChange}>
                          <option value="">Select Status</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                      </select>
                  </div>
                        <button type="submit" className="addroombttn">Add Employee</button>
                    </form>
                    <div>
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
                                onClick={() => showSelect(employees)}
                                disabled={employees.work_status === 'Active'}
                            >
                               Update
                            </button>
                        </div>
                    ))}
                    </div>
                </div>
                {selectedEmployee && openModal && (
    <>
        <h1 className="labelbooked">Add room</h1>
        <span onClick={closeModal}>Close</span>
        <div className="add-room-form">
            <div className="form-group">
                <label className="name" htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required className="inputroom" value={employee.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="department" className="department">Department:</label>
                <select id="department" name="department" required className="inputroom" value={employee.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="SBIT">School of Business and Information Technology (SBIT)</option>
                    <option value="SARFRAID">School of Fine Arts, Architecture and Interior Design (SARFRAID)</option>
                    <option value="SHTM">School of Hospitality and Tourism Management (SHTM)</option>
                    <option value="SSLATE">School of Sciences, Liberal Arts and Teacher Education (SSLATE)</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="status" className="status">Status:</label>
                <select id="status" name="status" required className="inputroom" value={employee.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="work_status" className="work_status">Work Status:</label>
                <select id="work_status" name="work_status" required className="inputroom" value={employee.work_status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <button className="addroombttn" onClick={() => updateEmployee(selectedEmployee)} >Update Employee Details</button>
            <button className="addroombttn" onClick={() => deleteEmployee(selectedEmployee)}>Delete Employee Details</button>
        </div>
    </>
)}

                </div>
            </div>
        </>
    )
}

export default CRUDEmployees;
