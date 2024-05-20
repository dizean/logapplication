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
const LogoutVisitor = () =>{
    const navigate = useNavigate();
    const { user } = useUser();
    // const [visits, Setvisits] = useState({
    //     date: "",
    //     name: "",
    //     purpose: "",
    //     place: "",
    //     time_out:"",
    //     gate:""
    //   });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showVisitors, setshowVisitors] = useState(true);
    const [visitorsData, setvisitorsData] = useState([]);
    // const [visitorData, setvisitorData] = useState([]);
    const [selectedVisitor, setselectedVisitor] = useState(null);
    const [isSuccessReturn, setIsSuccessReturn] = useState(false);
    
    const SuccessReturn = () =>{
        setIsSuccessReturn(true);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const employeesresponse = await axios.get(
            "http://localhost:3002/visits/"
            );
            const today = new Date().toISOString().split('T')[0];
            const filteredData = employeesresponse.data.filter(visits => visits.time_out === "" && visits.date === today);
            setvisitorsData(filteredData);
            setSearchResults(filteredData);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
        };

        fetchData();
    }, [selectedVisitor]);

    const handleOut = async (selectedVisitor) => {
        try {
        if (!selectedVisitor) {
            alert("No employee selected.");
            return;
        }

        const updateVisitor = {
            ...selectedVisitor,
            time_out: new Date().toLocaleTimeString(),
        };

        await axios.put(
            `http://localhost:3002/visits/${selectedVisitor.id}`,
            updateVisitor
        );
        SuccessReturn();
        setTimeout(() => {
            setIsSuccessReturn(false);
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
            `http://localhost:3002/visits/search`,
            { searchTerm }
        );
        const today = new Date().toISOString().split('T')[0];
        const filteredData = response.data.filter(visits => visits.time_out === "" && visits.date === today);
        setSearchResults(filteredData);
        setshowVisitors(false);
        } catch (error) {
        console.error("Error searching users:", error);
        }
    };
    const handleResetSearch = async () => {
        try {
        const response = await axios.get("http://localhost:3002/visits/");
        const today = new Date().toISOString().split('T')[0];
        const filteredData = response.data.filter(visits => visits.time_out === "" && visits.date === today);
        setSearchResults(filteredData);
        setshowVisitors(true);
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
    Visitors
   </header>
   <search className='w-full px-5 flex gap-3 justify-between'>
    <input
                type="text"
                className='bg-slate-100 w-1/4 py-4 px-5 rounded-lg focus:outline-none border-2 '
                placeholder="Search by name of visitor"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <log>
            <Link to="/visitorslog">
              <button className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>View Visitors Log</button>
            </Link>
        </log>
   </search>
   <main className='w-full flex flex-wrap justify-center py-4  gap-x-[2rem] gap-y-4 '>
   {searchResults.map((visitor) => (
    <div className='bg-slate-200 w-1/6 flex flex-col p-3 gap-1 rounded-xl'>
        <div className='flex gap-4  h-[80px] '>
            <div className='flex'>
                <img src={employeeicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl leading-5'>Name:</h1>
                <p className='text-xl font-bold line-clamp-2 leading-5'>{visitor.name}</p>
            </div>
        </div>
        <div className='flex gap-4  h-[80px]'>
            <div className='flex justify-center  '>
                <img src={statusicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Purpose</h1>
                <p className='text-xl font-bold leading-5 line-clamp-3'>{visitor.purpose}</p>
            </div>
        </div>
        <div className='flex gap-4  h-[80px]  '>
            <div className='flex justify-center'>
                <img src={departmenticon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Place Visited</h1>
                <p className='text-xl font-bold leading-5 line-clamp-2'>{visitor.place}</p>
            </div>
        </div>
        <div className='w-full flex text-white text-xl h-[50px]'>
                <button 
                onClick={() => handleOut(visitor)}
                className='bg-blue-700 w-full rounded-lg'>
                  Log out
                </button>
        </div>
    </div>
   ))}
    {isSuccessReturn && 
    (
        <>
        <Snackbar open={true} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
        Visitor Logged out.
        </Alert>
        </Snackbar>
        </>
    )}
   </main>
   </body>
    )
}

export default LogoutVisitor;