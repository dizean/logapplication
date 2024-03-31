import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../jsx/userContext";
import axios from "axios";
import lccb from '../../images/lccb.png';
import employeepic from '../../images/icon-employ.png';
import visitorpic from '../../images/Visitor.png';
import keypic from '../../images/ph_key.png';
import addvisicion from '../../images/employees.png';
const Home = () =>{
    const { user } = useUser();
    const [isAddVisitor, setisAddVisitor] = useState(false);
    const openAddVisitor= () => {
        setisAddVisitor(true);
    };
    const closeModal = () => {
        setisAddVisitor(false);
    }
    const [visits, Setvisits] = useState({
    date: "",
    name: "",
    purpose: "",
    place: "",
    gate:""
  });

  // add visitor record
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:3002/visits/", {
            ...visits,
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString(),
            admin_assigned: user.username,
        });
        console.log(response.data);
        Setvisits({
            date: "",
            name: "",
            purpose: "",
            place: "",
            gate:"",
        });
        alert("Visitor log recorded.")
        closeModal();
        } catch (error) {
        alert("error");
        console.error("data data:", error);
        }
    };

    const handleChange = (e) => {
        Setvisits({ ...visits, [e.target.name]: e.target.value });
    };
    return(
   <body className='h-screen'>
   <nav className='flex justify-between items-center bg-slate-100'>
    <div className='py-6 pl-5'>
    <img src={lccb} alt="lccb"/>
    </div>
    <div>
    <Link to="/" className='bg-blue-700 hover:bg-blue-500 py-5 px-20 text-2xl text-white rounded-lg mr-3'>
         Sign out
    </Link>
    </div>
   </nav>
   <main className='w-full flex px-10 py-16 gap-14 justify-center'>
        <div className='bg-slate-100 w-1/3 rounded-xl py-7'>
            <div className='flex p-5 gap-4'>
                <div className='w-1/3 flex items-center'>
                    <img src={employeepic} className='w-full' alt="" />
                </div>
                <div className='w-2/3 flex flex-col gap-y-3 '>
                <p className='text-5xl font-semibold tracking-wider'>
                    Employee Management
                </p>
                <p className='text-xl'>
                  Supporting employees through oversight, tracking, and tasks
                  like attendance monitoring, performance evaluation, and
                  record-keeping.
                </p>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-y-5 text-xl'>
            <Link to="/logemployee" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg ">Log Employee</button>
            </Link>
            <Link to="/employeelist" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Employee Records</button>
            </Link>
            <Link to="/employeelog" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Employee`s Log</button>
            </Link>
            </div>
        </div>
        <div className='bg-slate-100 w-1/3 rounded-xl py-7'>
            <div className='flex p-5 gap-4'>
                <div className='w-1/3 flex items-center'>
                    <img src={keypic} className='w-full' alt="" />
                </div>
                <div className='w-2/3 flex flex-col gap-y-3 '>
                <p className='text-5xl font-semibold tracking-wider'>
                    Keys Management
                </p>
                <p className='text-xl'>
                    Simplifying space organization, including room allocation, resource scheduling, maintenance tracking, and maximizing facility usage.
                </p>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-y-5 text-xl'>
            <Link to="/borrowreturn" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Borrow / Return Room Key</button>
            </Link>
            <Link to="/roomlist" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Room Records</button>
            </Link>
            <Link to="/keyslog" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Keys Log</button>
            </Link>
            </div>
        </div>
        <div className='bg-slate-100 w-1/3 rounded-xl py-7'>
            <div className='flex p-5 gap-4'>
                <div className='w-1/3 flex items-center'>
                    <img src={visitorpic} className='w-full' alt="" />
                </div>
                <div className='w-2/3 flex flex-col gap-y-3 '>
                <p className='text-5xl font-semibold tracking-wider'>
                    Visitor Management
                </p>
                <p className='text-xl'>
                Managing guest interactions, including registration, access control, activity monitoring, and ensuring a secure and welcoming environment.
                </p>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-y-5 text-xl'>
                <button onClick={openAddVisitor} className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Log Visitor</button>
            {/* <Link to="/" className='flex'>
                <button className="click-btn text-white  w-11/12 py-9 mx-auto bg-blue-500 rounded-lg ">Employee Records</button>
            </Link> */}
            <Link to="/visitorslog" className='flex'>
                <button className="hover:bg-blue-500 text-white w-11/12 py-9 mx-auto bg-blue-700 rounded-lg">Visitor`s Log</button>
            </Link>
            </div>
        </div>
   </main>
   {( isAddVisitor &&
   <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
    <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <div>
            <div className='w-1/4 mx-auto'>
                <img src={addvisicion} className="" alt="" />
            </div>
            <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
            Fill Up Visitor Information
            </h1> 
        </div>
        <div className='flex pb-5 gap-4'>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Name
                </div>
                <div className='w-full'>
                    <input 
                    name="name"
                    type="text"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={visits.name}
                    onChange={handleChange}
                    required  autoComplete="off"/>
                </div>
            </div>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Purpose
                </div>
                <div className='w-full'>
                    <input 
                    name="purpose"
                    type="text"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={visits.purpose}
                    onChange={handleChange}
                    required autoComplete="off" />
                </div>
            </div>
        </div>
        <div className='flex pb-5 gap-4'>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Place of Visit
                </div>
                <div className='w-full'>
                    <input
                    name="place"
                    type="text"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={visits.place}
                    onChange={handleChange}
                    required autoComplete="off"  />
                </div>
            </div>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Gate
                </div>
                <div>
                    <select
                    id="gate"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="gate"
                    value={visits.gate}
                    onChange={handleChange}
                    required  >
                    <option value="">Select Gate</option>
                    <option value="Galo Gate">Galo Gate</option>
                    <option value="Rizal Gate">Rizal Gate</option>
                </select>
                </div>
            </div>
        </div>
        
        <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button onClick={handleSubmit} className='bg-blue-700 w-1/2 py-5 rounded-lg'>
                 Log Visitor
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

export default Home;