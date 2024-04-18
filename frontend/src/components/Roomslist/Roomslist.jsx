import React ,{useState,useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import keyicon from '../../images/doorway.png';
import statusicon from '../../images/time-management.png';
import locationicon from '../../images/pin.png';
import updateicon from '../../images/refresh.png';
import addicon from '../../images/key-room.png';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const RoomList = () =>{
    const navigate = useNavigate();
    const [room, Setroom] = useState({
        room: "",
        location: "",
        status: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showRooms, setshowRooms] = useState(true);
    const [roomData, setRoomData] = useState([]);
    const [selectedRoom, setselectedRoom] = useState(null);
    const [isUpdateSucces, setIsUpdateSucces] = useState(false);
    const [isAddSuccess, setIsAddSuccess] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3002/room/");
            setRoomData(response);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
        };
        fetchData();
        if (selectedRoom) {
        Setroom({
            room: selectedRoom.room,
            location: selectedRoom.location,
            status: selectedRoom.status,
        });
        }
    }, [selectedRoom]);
    const handleSearch = async () => {
        try {
        const response = await axios.post(`http://localhost:3002/room/search`, {
            searchTerm,
        });
        setSearchResults(response.data);
        setshowRooms(false);
        } catch (error) {
        console.error("Error searching users:", error);
        }
    };
    const updateSuccess = () =>{
        setIsUpdateSucces(true);
    };
    const addSuccess = () =>{
        setIsAddSuccess(true);
    };
    const handleResetSearch = async () => {
        try {
        const response = await axios.get("http://localhost:3002/room/");
        setSearchResults(response.data);
        setshowRooms(true);
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
    const handleChange = (e) => {
        Setroom({ ...room, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const addRoom = {
            ...room,
            status: "Available",
        };
        const response = await axios.post("http://localhost:3002/room/", addRoom);
        closeModal();
        addSuccess();
        setTimeout(() => {
            setIsAddSuccess(false);
        }, 3000);
        setTimeout(() => {
            navigate(0);
        }, 1000);
        } catch (error) {
        console.error("data data:", room);
        console.error("data data:", error);
        }
    };

    const updateRoom = async (selectedRoom) => {
        if (!selectedRoom) {
        alert("No selected employee");
        }
        try {
        const response = await axios.put(
            `http://localhost:3002/room/${selectedRoom.id}`,
            room
        );
        closeModal();
        updateSuccess();
        setTimeout(() => {
            setIsUpdateSucces(false);
        }, 3000);
        setTimeout(() => {
            navigate(0);
        }, 1000);
        
        } catch (error) {
        alert("Error updating employee:", error);
        }
    };
    const [isUpdateRoom, setisUpdateRoom] = useState(false);
    const [isAddRoom, setisAddRoom] = useState(false);
    const openUpdateRoom = (selectedRoom) => {
        setisUpdateRoom(true);
        setselectedRoom(selectedRoom);
    };
    const openAddRoom= () => {
        setisAddRoom(true);
        Setroom({
            room: "",
            location: "",
            status: "",
        });
    };
    const closeModal = () => {
        setisUpdateRoom(false);
        setisAddRoom(false);}
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
    Rooms Record
   </header>
   <search className='w-full px-5 flex gap-3 justify-between'>
    <input
                type="text"
                className='bg-slate-100 w-1/4 py-4 px-5 rounded-lg focus:outline-none border-2 '
                placeholder="Search by room name or number"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <log>
              <button onClick={openAddRoom} className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>Add a room</button>
        </log>
   </search>
   <main className='w-full flex flex-wrap justify-center py-4  gap-x-[2rem] gap-y-4 '>
   {searchResults.map((room) => (
   <div className='bg-slate-200 w-1/6 flex flex-col p-3 gap-1 rounded-xl'>
       <div className='flex gap-4  h-[50px] '>
            <div className='flex h-full'>
                <img src={keyicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col h-full '>
                <h1 className='text-xl'>Room</h1>
                <p className='text-xl font-bold leading-5 line-clamp-2'>{room.room}</p>
            </div>
        </div>
        <div className='flex gap-4   h-[50px] '>
            <div className='flex justify-center  '>
                <img src={statusicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col'>
                <h1 className='text-l'>Status</h1>
                <p className='text-l font-bold leading-5'>{room.status}</p>
            </div>
        </div>
        <div className='flex gap-4 h-[70px]'>
            <div className='flex'>
                <img src={locationicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col'>
                <h1 className='text-l'>Location</h1>
                <p className='text-l font-bold leading-5 line-clamp-2'>{room.location}</p>
            </div>
        </div>
        <div className='w-full flex text-white text-xl h-[50px]'>
                <button 
                onClick={() => openUpdateRoom(room)}
                disabled={room.status === "Active"}
                className='bg-blue-700 w-full rounded-lg'>
                  Update
                </button>
        </div>
    </div>
   ))}
   </main>
   {( isUpdateRoom && selectedRoom &&
   <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
    <div className='w-1/3 h-[480px] bg-blue-400 p-5 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
    <div >
            <div className='w-1/4 mx-auto'>
                <img src={updateicon} className='w-[65px] h-[65px]' alt="" />
            </div>
            <h1 className='text-3xl font-semibold text-center leading-tight'>
            Room Information
            </h1> 
        </div>
        <div className='gap-4 '>
            <div className='w-full'>
                <div className='text-xl font-semibold py-2'>
                    Room name / number
                </div>
                <div className='w-full'>
                    <input 
                    type="text"
                    name="room"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={room.room}
                    onChange={handleChange}
                    autoComplete="off"  />
                </div>
            </div>
            <div className='w-full'>
                <div className='text-xl font-semibold py-2'>
                    Status
                </div>
                <div className='w-full'>
                <select
                    id="status"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="status"
                    required
                    value={room.status}
                    onChange={handleChange}
                >
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                </div>
            </div>
        </div>
        <div className='flex'>
            <div className='w-full'>
                <div className='text-xl font-semibold py-2'>
                    Location
                </div>
                <div>
                <input 
                    type="text"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={room.location}
                    onChange={handleChange}
                    name="location"
                    autoComplete="off"  />
                </div>
            </div>
        </div>
        <div className='w-full flex gap-3 py-4 text-white text-l font-sem'>
                <button 
                 onClick={() => updateRoom(selectedRoom)}
                className='bg-blue-700 w-1/2 p-4 rounded-lg'>
                  Update
                </button>
                <button onClick={closeModal} className='bg-red-700 w-1/2 rounded-lg disabled:bg-red-700'>
                  Cancel
                </button>
              </div>
    </div>
   </div>
   )}
   {( isAddRoom &&
   <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
    <div className='w-1/3 h-[480px] bg-blue-400 p-5 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
   <div>
            <div className='w-1/4 mx-auto'>
                <img src={addicon} className='w-[65px] h-[65px]' alt="" />
            </div>
            <h1 className='text-3xl font-semibold text-center leading-tight'>
            Fill Up Room Information    
            </h1> 
        </div>
       <div className='gap-4 '>
           <div className='w-full'>
               <div className='text-xl font-semibold py-2'>
                   Room name / number
               </div>
               <div className='w-full'>
                   <input 
                   type="text"
                   className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                   name="room"
                   value={room.room}
                   onChange={handleChange}
                   autoComplete="off" />
               </div>
           </div>
           <div className='w-full'>
               <div className='text-xl font-semibold py-2'>
                   Status
               </div>
               <div className='w-full'>
               <select
                   id="classification"
                   className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                   name="status"
                   value={room.status}
                   onChange={handleChange}
                   required
               >
                   <option value="">Select Status</option>
                   <option value="Academic Non Teaching Personnel">Available</option>
                   <option value="Non Teaching Personnel">Unavailable</option>
               </select>
               </div>
           </div>
       </div>
       <div className='flex '>
           <div className='w-full'>
               <div className='text-xl font-semibold py-2'>
                   Location
               </div>
               <div>
               <input 
                   type="text"
                   className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                   name="location"
                   value={room.location}
                   onChange={handleChange}
                   autoComplete="off"  />
               </div>
           </div>
       </div>
       <div className='w-full flex gap-3 py-4 text-white text-l font-sem'>
               <button
               onClick={handleSubmit}
               className='bg-blue-700 w-1/2 p-4 rounded-lg'>
                 Add
               </button>
               <button onClick={closeModal} className='bg-red-700 w-1/2 rounded-lg disabled:bg-red-700'>
                 Cancel
               </button>
             </div>
   </div>
  </div>
   )}
   {isAddSuccess && 
    (
        <>
        <Snackbar open={true}  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
        Adding Room Successful.
        </Alert>
        </Snackbar>
        </>
    )}
    {isUpdateSucces && 
    (
        <>
        <Snackbar open={true} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
       Updating Room Successful.
        </Alert>
        </Snackbar>
        </>
    )}
   </body>
    )
}

export default RoomList;