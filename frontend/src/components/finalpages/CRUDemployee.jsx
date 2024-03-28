import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHome from './Navbar';
import { Link ,useNavigate} from 'react-router-dom';
import "../finalpages/logemployee.css";
import person from "../../images/person.png";
import classification from "../../images/classification.png";
import status from "../../images/status.png";
const CRUDemployee = () => {
    const [UpdateEmployee, setUpdateEMployee] = useState(false);
    const [openEmployee, setOpenEmployee] = useState(false);
    const openModalEmployee = () => {
        setOpenEmployee(true);
        Setemployee({
          name: '',
          classification:'',
    department: '',
    status: '',
    work_status: '',
      });
      };
    const openUpdateEmployee = (selectedEmployee) => {
        setselectedEmployee(selectedEmployee);
        console.log(selectedEmployee.id);
        setUpdateEMployee(true);
      };
      const closeModal = () => {
        setUpdateEMployee(false);
        setOpenEmployee(false);
      };
      const navigate = useNavigate();
  const [employee, Setemployee] = useState({
    name: '',
    classification:'',
    department: '',
    status: '',
    work_status: '',
  });
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

  //adduser
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recordemployee = {
        ...employee,
        work_status: 'Inactive'
      }
      const response = await axios.post('http://localhost:3002/employees/', recordemployee);
      alert("Employee added.");
      console.log(response.data);
      closeModal();
      navigate(0);  
    } catch (error) {
      console.error('data data:', employee);
    }
  };
  const updateEmployee = async (selectedEmployee) => {
    if(!selectedEmployee){
      alert('No selected employee');
    }
    try {
      const response = await axios.put(`http://localhost:3002/employees/${selectedEmployee.id}`, employee);
      alert("Updated Successfully.");
      closeModal();
      navigate(0);  
    } catch (error) {
      alert('Error updating employee:', error);
    }
  };
  // const [isDeleted, setIsDeleted] = useState(false);

  //   const handleDelete = () => {
  //       setIsDeleted(true);
  //   };
  // const deleteEmployee = async (selectedEmployee) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:3002/employees/${selectedEmployee.id}`);
  //     alert("Deleted successfully.")
  //     closeModal();
  //     navigate(0);  
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

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
            classification: selectedEmployee.classification,
            department: selectedEmployee.department,
            status: selectedEmployee.status,
            work_status: selectedEmployee.work_status
          });
        }
      }, [selectedEmployee]);
      
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
        <div className='employeelog'>
            <NavHome/>
            <div className='data-content'>
            <div className='title'>
              <div className='t-left'>
                Employees Log
                </div>
              <div className='t-right'>
                    <button onClick={openModalEmployee}>
                        Add Employee
                    </button>
                    </div>
            </div>
            <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by name of employee"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <div className='data-container'>
            {searchResults.map((employees) => (
            <div className="data-grid">

                <div className="data-parent">
                <div className="personIcon">
                  <img src={person} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Employee Name:</p>
                  </div>
                  <div className="employee-data">
                    <h3>{employees.name}</h3>
                  </div>
                </div>

                
              </div>
              

              <div className="data-parent">
                <div className="personIcon">
                  <img src={classification} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Employee Classification:</p>
                  </div>
                  <div className="employee-data">
                    <h3 className='fit-text'>{employees.classification}</h3>
                  </div>
                </div>

                
              </div>

              <div className="data-parent">
                <div className="personIcon">
                  <img src={status} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Status:</p>
                  </div>
                  <div className="employee-data">
                  <h4>
                {employees.status}
              </h4>
                  </div>
                </div>

                
              </div>

              <div className="dept">
              <h5 >
               {employees.department}
              </h5>
              </div>
           
             
             
              <div className='log-buttons'>
                <button onClick={() => openUpdateEmployee(employees)}>
                  Update
                </button>
              </div>
            </div>
            ))}
            </div>
            </div>
            
            {openEmployee &&
            (
                <>
                  <div className="modalvisit">
                <div className='visitform'>
                    <h1>Fill up Form</h1>
                    <div className="name">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type='text' name='name' required value={employee.name} onChange={handleChange}>

                        </input>
                    </div>
                    <div className="classification">
    <label htmlFor="classification">
        Employee Classification:
    </label>
    <select
        id="classification"
        name="classification"
        required
        className="inputroom"
        value={employee.classification}
        onChange={handleChange}
    >
        <option value="">Select Department</option>
        <option value="Academic Non Teaching Personnel">Academic Non Teaching Personnel</option>
        <option value="Non Teaching Personnel">Non Teaching Personnel</option>
        <option value="General Maintenance">General Maintenance</option>
        <option value="Teaching Personnel">Teaching Personnel</option>
        <option value="Administrator">Administrator</option>
    </select>
</div>
<div className="department">
    <label htmlFor="department">
        Department
    </label>
    <select
        disabled={!employee.classification || (employee.classification !== 'Teaching Personnel')}
        id="department"
        name="department"
        required
        className="inputroom"
        value={employee.department}
        onChange={handleChange}
    >
        <option value="">Select Department</option>
        <option value="School of Business and Information Technology">
            School of Business and Information Technology (SBIT)
        </option>
        <option value="School of Fine Arts, Architecture and Interior Design">
            School of Fine Arts, Architecture and Interior Design (SARFAID)
        </option>
        <option value="School of Hospitality and Tourism Management">
            School of Hospitality and Tourism Management (SHTM)
        </option>
        <option value="School of Sciences, Liberal Arts and Teacher Education">
            School of Sciences, Liberal Arts and Teacher Education (SSLATE)
        </option>
    </select>
</div>

                    <div className="status">
                        <label htmlFor="status">
                            Status
                        </label>
                        <select id="status" name="status" required className="inputroom" value={employee.status} onChange={handleChange}>
                            <option value="">Select Status</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                        </select>
                    </div>
                    <div className="buttons">
                        <button className='log' onClick={handleSubmit}>
                            Add Employee
                        </button>
                        <button className='cancel' onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
                </>
            )}
            
            {UpdateEmployee && selectedEmployee &&
            (
                <>
                 <div className="modal-background"></div>
                <div className="update">
                  
                <div className='updateform'>
                    <h1>Employee Details</h1>

                    <div className="fillup-form">

                    
                    <div className="form-name">
                    <label htmlFor="name">
                           Name
                        </label>
                        <input type='text' name='name' value={employee.name} onChange={handleChange}>

                        </input>
                    </div>
                    

                    <div className="form-stat">
                    <label htmlFor="status">
                            Status:
                        </label>
                        <br/>
                        <select id="status" name="status" required className="inputroom"value={employee.status} onChange={handleChange} >
                            <option value="">Select Status</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                        </select>
                    </div>


                    <div className="department-form">
                    <label htmlFor="department">
                            Department:
                        </label>
                        <br/>
                        <select disabled={employee.classification !== 'Teaching Personnel'} id="department" name="department" required className="inputroom"  value={employee.department} onChange={handleChange}>
                            <option value="">Select Department</option>
                            <option value="School of Business and Information Technology">School of Business and Information Technology (SBIT)</option>
                            <option value="School of Fine Arts, Architecture and Interior Design">School of Fine Arts, Architecture and Interior Design (SARFAID)</option>
                            <option value="School of Hospitality and Tourism Management">School of Hospitality and Tourism Management (SHTM)</option>
                            <option value="School of Sciences, Liberal Arts and Teacher Education">School of Sciences, Liberal Arts and Teacher Education (SSLATE)</option>
                        </select>
                    </div>


                    <div className="workstat-form">
                    <label htmlFor="work_status">
                            Work Status:
                        </label>
                        <br/>
                        <select id="work_status" name="work_status" required className="inputroom" value={employee.work_status} onChange={handleChange}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="classification-form">
                    <label htmlFor="classification">
                            Employee Classification : 
                        </label>
                        <br></br>
                        <select id="classification" name="classification" required className="inputroom" value={employee.classification} onChange={handleChange} >
                            <option value="">Select Department</option>
                            <option value="Academic Non Teaching Personnel">Academic Non Teaching Personnel</option>
                            <option value="Non Teaching Personnel">Non Teaching Personnel</option>
                            <option value="General Maintenance">General Maintenance</option>
                            <option value="Teaching Personnel">Teaching Personnel</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>

                    </div>

                    {/* <div className="top">
                    <div className="name">
                        <label htmlFor="name">
                           Name
                        </label>
                        <input type='text' name='name' value={employee.name} onChange={handleChange}>

                        </input>
                    </div>
                    <div className="status">
                        <label htmlFor="status">
                            Status
                        </label>
                        <select id="status" name="status" required className="inputroom"value={employee.status} onChange={handleChange} >
                            <option value="">Select Status</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                        </select>
                    </div>
                    </div>
                    <div className="top">
                    <div className="department">
                        <label htmlFor="department">
                            Department
                        </label>
                        <select disabled={employee.classification !== 'Teaching Personnel'} id="department" name="department" required className="inputroom"  value={employee.department} onChange={handleChange}>
                            <option value="">Select Department</option>
                            <option value="School of Business and Information Technology">School of Business and Information Technology (SBIT)</option>
                            <option value="School of Fine Arts, Architecture and Interior Design">School of Fine Arts, Architecture and Interior Design (SARFAID)</option>
                            <option value="School of Hospitality and Tourism Management">School of Hospitality and Tourism Management (SHTM)</option>
                            <option value="School of Sciences, Liberal Arts and Teacher Education">School of Sciences, Liberal Arts and Teacher Education (SSLATE)</option>
                        </select>
                    </div>
                    <div className="work_status" >
                        <label htmlFor="work_status">
                            Work Status
                        </label>
                        <select id="work_status" name="work_status" required className="inputroom" value={employee.work_status} onChange={handleChange}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    </div>
                    <div className="top">
                    <div className="classification">
                        <label htmlFor="classification">
                            Employee Classification : 
                        </label>
                        <select id="classification" name="classification" required className="inputroom" value={employee.classification} onChange={handleChange} >
                            <option value="">Select Department</option>
                            <option value="Academic Non Teaching Personnel">Academic Non Teaching Personnel</option>
                            <option value="Non Teaching Personnel">Non Teaching Personnel</option>
                            <option value="General Maintenance">General Maintenance</option>
                            <option value="Teaching Personnel">Teaching Personnel</option>
                        </select>
                    </div>
                    </div> */}
                    <div className="buttons">
                        <button className='log' onClick={() => updateEmployee(selectedEmployee)}>
                            Update Employee Information
                        </button>
                        {/* <button className='log' onClick={() => deleteEmployee(selectedEmployee)}>
                            Delete Employee Information
                        </button> */}
                        <button className='cancel' onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
                </>
            )}
        </div>
        
        
    )
}

export default CRUDemployee;
