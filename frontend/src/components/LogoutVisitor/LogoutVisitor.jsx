import React, {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import { useUser } from "../jsx/userContext";
import employeeicon from '../../images/employee.png';
import statusicon from '../../images/time-management.png';
import departmenticon from '../../images/department.png';
const LogoutVisitor = () =>{
    const navigate = useNavigate();
    const { user } = useUser();
    const [visits, Setvisits] = useState({
        date: "",
        name: "",
        purpose: "",
        place: "",
        time_out:"",
        gate:""
      });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showVisitors, setshowVisitors] = useState(true);
    const [visitorsData, setvisitorsData] = useState([]);
    const [visitorData, setvisitorData] = useState([]);
    const [selectedVisitor, setselectedVisitor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const employeesresponse = await axios.get(
            "http://localhost:3002/visits/"
            );
            const filteredData = employeesresponse.data.filter(visits => visits.time_out === "");
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
        alert("Logged out.");
        navigate(0);
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
        setSearchResults(response.data);
        setshowVisitors(false);
        } catch (error) {
        console.error("Error searching users:", error);
        }
    };
    const handleResetSearch = async () => {
        try {
        const response = await axios.get("http://localhost:3002/visits/");
        setSearchResults(response.data);
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
    Visitors
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
   {searchResults.map((visitor) => (
    <div className='bg-slate-200 w-1/5 flex flex-col p-5 gap-2 rounded-xl'>
        <div className='flex gap-4 justify-center items-center h-36'>
            <div className='flex justify-center w-1/3'>
                <img src={employeeicon} className='w-full' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Visitor Name:</h1>
                <p className='text-xl'>{visitor.name}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-28'>
            <div className='flex justify-center w-1/3 '>
                <img src={statusicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Purpose</h1>
                <p className='text-xl'>{visitor.purpose}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-28'>
            <div className='flex justify-center w-1/3 '>
                <img src={departmenticon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Place Visited</h1>
                <p className='text-xl'>{visitor.place}</p>
            </div>
        </div>
        <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button 
                onClick={() => handleOut(visitor)}
                className='bg-blue-700 w-full rounded-lg py-4 disabled:bg-red-700' >
                  Log out
                </button>
        </div>
    </div>
   ))}
   </main>
   </body>
    )
}

export default LogoutVisitor;