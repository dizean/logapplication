import React ,{useState,useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import keyicon from '../../images/doorway.png';
import statusicon from '../../images/time-management.png';
import locationicon from '../../images/pin.png';
import updateicon from '../../images/refresh.png';
import addicon from '../../images/key-room.png';
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
    const [openModal, setOpenModal] = useState(false);
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
        console.log(response.data);
        closeModal();
        navigate(0);
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
        alert("Successfully updated!");
        closeModal();
        navigate(0);
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
        setisAddRoom(false);
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
    Rooms Record
   </header>
   <search className='w-full px-5 flex gap-3 justify-between'>
    <input
                type="text"
                className='bg-slate-100 w-1/4 py-4 px-5 rounded-lg focus:outline-none '
                placeholder="Search by room name or number"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <log>
              <button onClick={openAddRoom} className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>Add a room</button>
        </log>
   </search>
   <main className='w-full flex flex-wrap justify-center p-4 py-16 gap-x-[4.6rem] gap-y-8 '>
   {searchResults.map((room) => (
    <div key={room.id} className='bg-slate-200 w-1/5 flex flex-col p-5 gap-2 rounded-xl'>
        <div className='flex gap-4 justify-center items-center h-28'>
            <div className='flex justify-center w-1/3'>
                <img src={keyicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Room</h1>
                <p className='text-xl'>{room.room}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-28'>
            <div className='flex justify-center w-1/3 '>
                <img src={statusicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Status</h1>
                <p className='text-xl'>{room.status}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-28' >
            <div className='flex justify-center w-1/3 '>
                <img src={locationicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-2xl font-semibold'>Location</h1>
                <p className='text-xl'>{room.location}</p>
            </div>
        </div>
        <div className='w-full flex gap-3 py-3 text-white text-xl'>
                <button 
                onClick={() => openUpdateRoom(room)}
                disabled={room.status === "Active"}
                className='bg-blue-700 w-full py-4 rounded-lg'>
                  Update
                </button>
        </div>
    </div>
   ))}
   </main>
   {( isUpdateRoom &&
   <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
    <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
    <div>
            <div className='w-1/4 mx-auto'>
                <img src={updateicon} className="" alt="" />
            </div>
            <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
            Room Information
            </h1> 
        </div>
        <div className='flex pb-5 gap-4 '>
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
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
            <div className='w-1/2'>
                <div className='text-2xl pb-2'>
                    Status
                </div>
                <div className='w-full'>
                <select
                    id="classification"
                    className='p-2 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    name="status"
                    required
                    value={room.status}
                    onChange={handleChange}
                >
                    <option value="">Select Status</option>
                    <option value="Academic Non Teaching Personnel">Available</option>
                    <option value="Non Teaching Personnel">Unavailable</option>
                </select>
                </div>
            </div>
        </div>
        <div className='flex pb-5 '>
            <div className='w-full'>
                <div className='text-2xl pb-2'>
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
        <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button 
                 onClick={() => updateRoom(selectedRoom)}
                className='bg-blue-700 w-1/2 py-5 rounded-lg'>
                  Update Room Information
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
   <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
   <div>
            <div className='w-1/4 mx-auto pb-5'>
                <img src={addicon} className="" alt="" />
            </div>
            <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
            Fill Up Room Information    
            </h1> 
        </div>
       <div className='flex pb-5 gap-4 '>
           <div className='w-1/2'>
               <div className='text-2xl pb-2'>
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
           <div className='w-1/2'>
               <div className='text-2xl pb-2'>
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
       <div className='flex pb-5 '>
           <div className='w-full'>
               <div className='text-2xl pb-2'>
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
       <div className='w-full flex gap-3 py-7 text-white text-xl'>
               <button
               onClick={handleSubmit}
               className='bg-blue-700 w-1/2 py-5 rounded-lg'>
                 Add Room 
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

export default RoomList;