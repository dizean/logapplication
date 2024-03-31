import React, {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import { useUser } from "../jsx/userContext";
import employeeicon from '../../images/employee.png';
import statusicon from '../../images/time-management.png';
import departmenticon from '../../images/department.png';
const LogEmployee = () =>{
    const navigate = useNavigate();
    const { user } = useUser();
    // const [employees, Setemployees] = useState({
    //   name: '',
    //   department: '',
    //   status: ''
    // });
    const [employeelog, Setemployeelog] = useState({
        date: "",
        name: "",
        time_in: "",
        time_out: "",
        admin_assigned: "",
        employee_id: "",
        status: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showEmployees, setshowEmployees] = useState(true);
    const [employeesData, setEmployeesData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const employeesresponse = await axios.get(
            "http://localhost:3002/employees/"
            );
            setEmployeesData(employeesresponse.data);
            setSearchResults(employeesresponse.data);

            const employeeresponse = await axios.get(
            "http://localhost:3002/employee/"
            );
            setEmployeeData(employeeresponse.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
        };

        fetchData();
    }, [selectedEmployee]);

    const handleIn = async (selectedEmployee) => {
        console.log("Selected Employee:", selectedEmployee.id);
        setSelectedEmployee(selectedEmployee);
        if (!selectedEmployee) {
        console.error("No employee selected");
        return;
        }
        try {
        const recordEmployee = {
            date: new Date().toISOString().split("T")[0],
            employee_id: selectedEmployee.id,
            name: selectedEmployee.name,
            time_in: new Date().toLocaleTimeString(),
            time_out: "",
            admin_assigned: user.username,
            status: "In",
        };

        const response = await axios.post(
            "http://localhost:3002/employee/",
            recordEmployee
        );
        const updateEmployee = {
            ...selectedEmployee,
            work_status: "Active",
        };
        await axios.put(
            `http://localhost:3002/employees/${selectedEmployee.id}`,
            updateEmployee
        );

        alert("Logged in.");
        navigate(0);
        console.log(response.data);
        } catch (error) {
        console.error("Error logging employee:", error);
        }
    };

    const handleOut = async (selectedEmployee) => {
        try {
        if (!selectedEmployee) {
            alert("No employee selected.");
            return;
        }

        const updateEmployee = {
            ...selectedEmployee,
            work_status: "Inactive",
        };

        await axios.put(
            `http://localhost:3002/employees/${selectedEmployee.id}`,
            updateEmployee
        );

        const employeeToUpdate = employeeData.find(
            (employee) =>
            employee.employee_id === selectedEmployee.id &&
            employee.status === "In" &&
            employee.time_out === ""
        );

        if (!employeeToUpdate) {
            alert("No active log found for the selected employee.");
            return;
        }

        const updatedEmployeeLog = {
            ...employeeToUpdate,
            time_out: new Date().toLocaleTimeString(),
            status: "Out",
        };

        await axios.put(
            `http://localhost:3002/employee/${employeeToUpdate.id}`,
            updatedEmployeeLog
        );

        const updatedEmployeeData = employeeData.map((employee) =>
            employee.id === employeeToUpdate.id ? updatedEmployeeLog : employee
        );

        alert("Logged out.");
        navigate(0);
        } catch (error) {
        console.error("Error handling sign out:", error);
        }
    };
    const handleSearch = async () => {
        try {
        const response = await axios.post(
            `http://localhost:3002/employees/search`,
            { searchTerm }
        );
        setSearchResults(response.data);
        setshowEmployees(false);
        } catch (error) {
        console.error("Error searching users:", error);
        }
    };
    const handleResetSearch = async () => {
        try {
        const response = await axios.get("http://localhost:3002/employees/");
        setSearchResults(response.data);
        setshowEmployees(true);
        } catch (error) {
        console.error("Error fetching all users:", error);
        }
    };
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
        handleResetSearch();
        } else {
        handleSearch();
        }
    };
    // const handleChange = (e) => {
    //   Setemployees({ ...employees, [e.target.name]: e.target.value });
    // };
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
    Employees
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
            <Link to="/employeelog">
              <button className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>View Employees Log</button>
            </Link>
        </log>
   </search>
   <main className='w-full flex flex-wrap justify-center py-10  gap-x-[4rem] gap-y-8 '>
   {searchResults.map((employees) => (
    <div className='bg-slate-200 w-1/5 flex flex-col p-5 gap-2 rounded-xl'>
        <div className='flex gap-4 justify-center items-center h-36'>
            <div className='flex justify-center w-1/3'>
                <img src={employeeicon} className='w-full' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Employee Name:</h1>
                <p className='text-xl'>{employees.name}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-28'>
            <div className='flex justify-center w-1/3 '>
                <img src={statusicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Status:</h1>
                <p className='text-xl'>{employees.status}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-28'>
            <div className='flex justify-center w-1/3 '>
                <img src={departmenticon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Department:</h1>
                <p className='text-xl'>{employees.department}</p>
            </div>
        </div>
        <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button
                onClick={() => handleIn(employees)}
                disabled={employees.work_status === "Active"}
                className='bg-blue-700 w-1/2 py-5 rounded-lg disabled:bg-red-700'>
                  Log in
                </button>
                <button 
                onClick={() => handleOut(employees)}
                disabled={employees.work_status === "Inactive"}
                className='bg-blue-700 w-1/2 rounded-lg disabled:bg-red-700' >
                  Log out
                </button>
              </div>
    </div>
   ))};
   </main>
   </body>
    )
}

export default LogEmployee;