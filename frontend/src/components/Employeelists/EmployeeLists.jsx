import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import employeeicon from '../../images/employee.png';
import classificationicon from '../../images/decision-tree.png';
import departmenticon from '../../images/department.png';
import statusicon from '../../images/time-management.png';
import updateicon from '../../images/refresh.png';
import addicon from '../../images/add-user.png';
const EmployeeList = () =>{
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
    const [isUpdateEmployee, setisUpdateEmployee] = useState(false);
    const [isAddEmployee, setisAddEmployee] = useState(false);
    const openUpdateEmployee = (selectedEmployee) => {
        setselectedEmployee(selectedEmployee);
        setisUpdateEmployee(true);
        
    };
    const openAddEmployee = () => {
        setisAddEmployee(true);
        Setemployee({
        name: '',
        classification:'',
        department: '',
        status: '',
        work_status: '',
        });
    };
    const closeModal = () => {
        setisUpdateEmployee(false);
        setisAddEmployee(false);
    }
    return(
   <body className='h-screen'>
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
    Employees Record
   </header>
   <search className='w-full px-5 flex gap-3 justify-between'>
    <input
                type="text"
                className='bg-slate-100 w-1/4 py-4 px-5 rounded-lg focus:outline-none '
                placeholder="Search by name of employee"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <log>
              <button onClick={openAddEmployee} className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>Add an employee</button>
        </log>
   </search>
   <main className='w-full flex flex-wrap justify-center py-16  gap-x-[.5rem] gap-y-8 '>
   {searchResults.map((employees) => (
    <div className='bg-slate-200 w-1/6 flex flex-col p-5 gap-2 rounded-xl'>
        <div className='flex gap-4 justify-center items-center h-2/3' >
            <div className='flex justify-center w-1/3'>
                <img src={employeeicon} className='w-full' alt="" />
            </div>
            <div className='w-2/3 h-28 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Employee Name</h1>
                <p className='text-2xl font-semibold line-clamp-2'>{employees.name}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-2/3'>
            <div className='flex justify-center w-1/3 '>
                <img src={statusicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Status</h1>
                <p className='text-2xl font-semibold line-clamp-2'>{employees.status}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-2/3'>
            <div className='flex justify-center w-1/3 '>
                <img src={classificationicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Classification</h1>
                <p className='text-2xl font-semibold line-clamp-2'>{employees.classification}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-2/3'>
            <div className='flex justify-center w-1/3 '>
                <img src={departmenticon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Department</h1>
                <p className='text-2xl font-semibold line-clamp-2'>{employees.department}</p>
            </div>
        </div>
        <div className='w-full flex gap-3 py-7 text-white text-xl h-2/3'>
                <button onClick={() => openUpdateEmployee(employees)} className='bg-blue-700 w-full py-5 rounded-lg'>
                  Update
                </button>
              </div>
    </div>
   ))}
   </main>
   {( isUpdateEmployee && selectedEmployee &&
   <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
    <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <div>
            <div className='w-1/4 mx-auto pb-5'>
                <img src={updateicon} className="" alt="" />
            </div>
            <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
            Employee Information
            </h1> 
        </div>
        <div className='flex pb-5 gap-4'>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Name
                </div>
                <div className='w-full'>
                    <input 
                    type="text"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="name"
                    value={employee.name} 
                    onChange={handleChange}  />
                </div>
            </div>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Employee Classification
                </div>
                <div>
                    <select
                    id="classification"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="classification"
                    value={employee.classification} 
                    onChange={handleChange}
                    required
                    
                >
                    <option value="">Select Classification</option>
                    <option value="Academic Non Teaching Personnel">Academic Non Teaching Personnel</option>
                    <option value="Non Teaching Personnel">Non Teaching Personnel</option>
                    <option value="General Maintenance">General Maintenance</option>
                    <option value="Teaching Personnel">Teaching Personnel</option>
                    <option value="Administrator">Administrator</option>
                </select>
                </div>
            </div>
        </div>
        <div className='flex pb-5 gap-4'>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Status
                </div>
                <div className='w-11/12'>
                <select
                    id="status"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="status"
                    value={employee.status} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
                </div>
            </div>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Work Status
                </div>
                <div>
                    <select
                    id="wstatus"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="wstatus"
                    value={employee.work_status} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Work Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                </div>
            </div>
        </div>
        <div className='flex pb-5 '>
            <div className='w-full'>
                <div className='text-2xl pb-2'>
                    Department
                </div>
                <div>
                    <select
                    id="department"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="department"
                    value={employee.department} 
                    onChange={handleChange}
                    required
                    disabled={employee.classification !== 'Teaching Personnel'}
                >
                    <option value="">Select Department</option>
                    <option value="School of Business and Information Technology">School of Business and Information Technology (SBIT)</option>
                    <option value="School of Fine Arts, Architecture and Interior Design">School of Fine Arts, Architecture and Interior Design (SARFAID)</option>
                    <option value="School of Hospitality and Tourism Management">School of Hospitality and Tourism Management (SHTM)</option>
                    <option value="School of Sciences, Liberal Arts and Teacher Education">School of Sciences, Liberal Arts and Teacher Education (SSLATE)</option>
                </select>
                </div>
            </div>
        </div>
        <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button 
                onClick={() => updateEmployee(selectedEmployee)}
                className='bg-blue-700 w-1/2 py-5 rounded-lg'>
                  Update Employee Information
                </button>
                <button onClick={closeModal} className='bg-red-700 w-1/2 rounded-lg disabled:bg-red-700'>
                  Cancel
                </button>
              </div>
    </div>
   </div>
   )}
   {( isAddEmployee &&
   <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
    <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
    <div>
            <div className='w-1/4 mx-auto pb-5'>
                <img src={addicon} className="" alt="" />
            </div>
            <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
        Fill Up Employee Information    
        </h1> 
        </div>
        <div className='flex pb-5 gap-4'>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Name
                </div>
                <div className='w-full'>
                    <input 
                    type="text"
                    name="name"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={employee.name} 
                    onChange={handleChange}  />
                </div>
            </div>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Employee Classification
                </div>
                <div>
                    <select
                    id="classification"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="classification"
                    value={employee.classification} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Classification </option>
                    <option value="Academic Non Teaching Personnel">Academic Non Teaching Personnel</option>
                    <option value="Non Teaching Personnel">Non Teaching Personnel</option>
                    <option value="General Maintenance">General Maintenance</option>
                    <option value="Teaching Personnel">Teaching Personnel</option>
                    <option value="Administrator">Administrator</option>
                </select>
                </div>
            </div>
        </div>
        <div className='flex pb-5 '>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Status
                </div>
                <div className='w-11/12'>
                <select
                    id="status"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="status"
                    value={employee.status} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
                </div>
            </div>
        </div>
        <div className='flex pb-5 '>
            <div className='w-full'>
                <div className='text-2xl pb-2'>
                    Department
                </div>
                <div>
                    <select
                    id="department"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="department"
                    value={employee.department} 
                    onChange={handleChange}
                    disabled={!employee.classification || (employee.classification !== 'Teaching Personnel')}
                    required
                >
                    <option value="">Select Department</option>
                    <option value="School of Business and Information Technology">School of Business and Information Technology (SBIT)</option>
                    <option value="School of Fine Arts, Architecture and Interior Design">School of Fine Arts, Architecture and Interior Design (SARFAID)</option>
                    <option value="School of Hospitality and Tourism Management">School of Hospitality and Tourism Management (SHTM)</option>
                    <option value="School of Sciences, Liberal Arts and Teacher Education">School of Sciences, Liberal Arts and Teacher Education (SSLATE)</option>
                </select>
                </div>
            </div>
        </div>
        <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button 
                onClick={handleSubmit}
                className='bg-blue-700 w-1/2 py-5 rounded-lg'>
                  Add Employee
                </button>
                <button onClick={closeModal} className='bg-red-700 w-1/2 rounded-lg disabled:bg-red-700'>
                  Cancel
                </button>
              </div>
    </div>
   </div>
   )}
   </body>
    )
}

export default EmployeeList;