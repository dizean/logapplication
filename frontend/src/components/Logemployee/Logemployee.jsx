import React, {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import { useUser } from "../jsx/userContext";
import employeeicon from '../../images/employee.png';
import statusicon from '../../images/time-management.png';
import departmenticon from '../../images/department.png';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const LogEmployee = () =>{
    const navigate = useNavigate();
    const { user } = useUser();
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

        SuccessLogin();
        setTimeout(() => {
            setIsSuccessLogin(false);
        }, 3000);
        setTimeout(() => {
            navigate(0);
        }, 1000);
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

        SuccessLogout();
        setTimeout(() => {
            setIsSuccessLogout(false);
        }, 3000);
        setTimeout(() => {
            navigate(0);
        }, 1000);
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
    const [isSuccessLogin, setIsSuccessLogin] = useState(false);
    const [isSuccesLogout, setIsSuccessLogout] = useState(false);
    const SuccessLogin = () =>{
        setIsSuccessLogin(true);
    }
    const SuccessLogout = () =>{
        setIsSuccessLogout(true);
    }
    // const handleChange = (e) => {
    //   Setemployees({ ...employees, [e.target.name]: e.target.value });
    // };
    return(
   <body className='h-screen'>
   <nav className='flex justify-between items-center bg-slate-100 drop-shadow-lg'>
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
                className='bg-slate-100 w-1/4 py-4 px-5 rounded-lg focus:outline-none border-2' 
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
   <main className='w-full flex flex-wrap justify-center py-16  gap-x-[2rem] gap-y-8 '>
   {searchResults.map((employees) => (
    <div className='bg-slate-200 w-1/6 flex flex-col p-4 gap-1 rounded-xl'>
        <div className='flex gap-4  h-[80px] '>
            <div className='flex '>
                <img src={employeeicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 h-full  flex flex-col '>
                <h1 className='text-xl h-[30px] leading-5 '>Name:</h1>
                <p className='text-xl  font-bold leading-5 line-clamp-2'>{employees.name}</p>
            </div>
        </div>
        <div className='flex gap-4   h-[50px] '>
            <div className='flex justify-center  '>
                <img src={departmenticon} className='w-[35px] h-[35px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col '>
                <h1 className='text-l h-[25px]'>Department:</h1>
                <p className='text-l h-[110px] font-bold leading-5'>
                    {employees.department === "School of Fine Arts, Architecture and Interior Design" ? "SARFAID" : 
                    (employees.department === "School of Business and Information Technology" ? "SBIT" : 
                    (employees.department === "School of Sciences, Liberal Arts and Teacher Education" ? "SSLATE" : 
                    (employees.department === "School of Hospitality and Tourism Management" ? "SHTM" : employees.department)))}
                </p>
            </div>
        </div>
        <div className='flex gap-4  h-[40px] items-center  '>
            <div className='flex justify-center'>
                <img src={statusicon} className='w-[35px] h-[35px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col'>
                {/* <h1 className='text-base h-[20px] leading-5 '>Status:</h1> */}
                <p className='text-l font-bold leading-5'>{employees.status}</p>
            </div>
        </div>
        <div className='w-full h-[50px] flex gap-3 text-white text-base font-semibold '>
                <button
                onClick={() => handleIn(employees)}
                disabled={employees.work_status === "Active"}
                className='bg-blue-700 w-1/2 h-[50px]  rounded-lg disabled:bg-red-700'>
                  Log in
                </button>
                <button 
                onClick={() => handleOut(employees)}
                disabled={employees.work_status === "Inactive"}
                className='bg-blue-700 w-1/2 h-[50px] rounded-lg disabled:bg-red-700' >
                  Log out
                </button>
        </div>
    </div>
   ))}
      {isSuccessLogin && 
    (
        <>
        <Snackbar open={true} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
        Employee Logged In.
        </Alert>
        </Snackbar>
        </>
    )}
    {isSuccesLogout && 
    (
        <>
        <Snackbar open={true} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
        Employee Logged Out.
        </Alert>
        </Snackbar>
        </>
    )}
   </main>
   </body>
    )
}

export default LogEmployee;