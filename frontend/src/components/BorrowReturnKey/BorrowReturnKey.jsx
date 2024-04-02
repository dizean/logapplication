import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { useUser } from '../jsx/userContext';
import lccb from '../../images/lccb.png';
import keyicon from '../../images/doorway.png';
import statusicon from '../../images/time-management.png';
import locationicon from '../../images/pin.png';
import borrowicon from '../../images/deal.png';
const BorrowReturnKey = () =>{
    const navigate = useNavigate();
    const { user } = useUser();
    const [borrow, setBorrow] = useState({
        room_id: '',
        room:'',
        date: '',
        name_borrower: '',
        time_borrowed: '',
        name_returner: '',
        time_returned: '',
        status: '',
    });
    const resetBorrowState = () => {
        setBorrow(borrow);
    };
    const [roomData, setRoomData] = useState([]);
    const [borrowData, setBorrowData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isBorrowOpen, setIsBorrowOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomResponse = await axios.get('http://localhost:3002/room/');
                setRoomData(roomResponse.data);
                setSearchResults(roomResponse.data);
                if (selectedRoom) {
                    const borrowResponse = await axios.get('http://localhost:3002/borrow/', {
                        params: {
                            room_id: selectedRoom.id,
                            room:selectedRoom.room,
                            status: 'Pending',
                        },
                    });
                    setBorrowData(borrowResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedRoom]);

    const handleBorrowOpen = (room) => {
        setSelectedRoom(room);
        setIsBorrowOpen(true);
    };

    const handleReturnOpen = (room) => {
        setSelectedRoom(room);
        setIsReturnOpen(true);
    };

    const closeModal = () => {
        setSelectedRoom(null);
        setIsBorrowOpen(false);
        setIsReturnOpen(false);
    };

    const selectedRoomId = selectedRoom ? selectedRoom.id : null;
    const selectedBorrow = borrowData.find(borrow => borrow.room_id === selectedRoomId && borrow.status === 'Pending');

    const handleBorrow = async (e) => {
        e.preventDefault();
        try {
        const updatedRoom = {
            ...selectedRoom,
            status: 'Unavailable',
            admin_assigned: 'null',
        };
        await axios.put(`http://localhost:3002/room/${selectedRoom.id}`, updatedRoom);

            const recordBorrow = {
            date: new Date().toISOString().split('T')[0],
            room_id: selectedRoom.id,
            room: selectedRoom.room,
            name_borrower: borrow.name_borrower,
            time_borrowed: new Date().toLocaleTimeString(),
            name_returner: '',
            time_returned: borrow.time_returned,
            status: 'Pending',
            admin_assigned: user.username,
        };
        
        const borrowRes = await axios.post('http://localhost:3002/borrow/', recordBorrow);
        alert('Key borrowed.')
        resetBorrowState();
        closeModal();
        navigate(0);
        } catch (error) {
        console.error('Error handling borrowing:', error);
        }
    };

    const handleReturn = async (e) => {
        e.preventDefault();
        try {
        if (!selectedBorrow) {
            alert('No borrow record found for the selected room.');
            return;
        }
        console.log(selectedBorrow);
        
        const updatedRoom = {
            ...selectedRoom,
            status: 'Available',
        };
        await axios.put(`http://localhost:3002/room/${selectedRoom.id}`, updatedRoom);
        const updatedBorrow = {
            ...selectedBorrow,
            name_returner:borrow.name_returner,
            time_returned: new Date().toLocaleTimeString(),
            status: 'Returned',
            
        };
        await axios.put(`http://localhost:3002/borrow/${selectedBorrow.id}`, updatedBorrow);
        alert('Key returned.');
        resetBorrowState();
        closeModal();
        navigate(0);
        } catch (error) {
        console.error('Error handling return:', error);
        }
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showRooms, setshowRooms] = useState(true);

    const handleSearch = async () => {
    try {
        const response = await axios.post(`http://localhost:3002/room/search`, { searchTerm });
        setSearchResults(response.data);
        setshowRooms(false);
    } catch (error) {
        console.error('Error searching users:', error);
    }
    };

    const handleResetSearch = async () => {
    try {
        const response = await axios.get('http://localhost:3002/room/');
        setSearchResults(response.data);
        setshowRooms(true);
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
        setBorrow({ ...borrow, [e.target.name]: e.target.value });
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
    Rooms
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
            <Link to="/keyslog">
              <button className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>View Keys Log</button>
            </Link>
        </log>
   </search>
   <main className='w-full flex flex-wrap justify-center items-center p-4 py-16 gap-x-[.5rem] gap-y-8 '>
   {searchResults.map((room) => (
    <div key={room.id} className='bg-slate-200 w-1/6 flex flex-col justify-center p-5 gap-2 rounded-xl'>
        <div  className='flex gap-4 justify-center items-center h-24'>
            <div className='flex justify-center w-1/3'>
                <img src={keyicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Room</h1>
                <p className='text-2xl font-semibold'>{room.room}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-20'>
            <div className='flex justify-center w-1/3 '>
                <img src={statusicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Status</h1>
                <p className='text-2xl font-semibold'>{room.status}</p>
            </div>
        </div>
        <div className='flex gap-4 justify-center items-center h-32'>
            <div className='flex justify-center w-1/3 '>
                <img src={locationicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Location</h1>
                <p className='text-2xl font-semibold'>{room.location}</p>
            </div>
        </div>
        <div className='w-full flex gap-3 py-4 text-white text-xl'>
                <button 
                onClick={() => handleBorrowOpen(room)}
                disabled={room.status === 'Unavailable'}
                className='bg-blue-700 w-1/2 py-4 rounded-lg disabled:bg-red-700'>
                  Borrow Key
                </button>
                <button 
                 onClick={() => handleReturnOpen(room)}
                 disabled={room.status === 'Available'}
                className='bg-blue-700 w-1/2 rounded-lg disabled:bg-red-700'>
                  Return Key
                </button>
              </div>
    </div>
   ))}
   </main>
   {isBorrowOpen &&
            (
                <>
                <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
                <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <div>
                <div className='w-1/4 mx-auto'>
                        <img src={borrowicon} className="" alt="" />
                </div>
                    <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
                    Provide Name of Key Borrower
                    </h1> 
                </div>
                <div className='flex pb-5 gap-4'>
                <div className='w-full'>
                <div className='w-full'>
                    <input 
                    name="name_borrower"
                    type="text"
                    className='px-2 py-5 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={borrow.name_borrower}
                    onChange={handleChange}
                    required  autoComplete="off"/>
                </div>
                </div>
                </div>
                <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button onClick={handleBorrow}  className='bg-blue-700 w-1/2 py-5 rounded-lg'>
                Submit
                </button>
                <button onClick={closeModal} className='bg-red-700 w-1/2 rounded-lg disabled:bg-red-700'>
                Cancel
                </button>
                </div>
                </div>
            </div>
                </>
            )}
{isReturnOpen && selectedBorrow &&
            (
                <>
                <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 '>
                <div className='w-1/3 bg-blue-400 p-10 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <div>
                <div className='w-1/4 mx-auto'>
                        <img src={borrowicon} className="" alt="" />
                </div>
                    <h1 className='text-5xl pb-10 font-semibold text-center leading-tight'>
                    Provide Name of Key Returner
                    </h1> 
                </div>
                <div className='flex pb-5 gap-4'>
                <div className='w-full'>
                <div className='w-full'>
                    <input 
                    name="name_returner"
                    type="text"
                    className='px-2 py-5 text-xl bg-slate-200 rounded-md w-full focus:outline-none'
                    value={borrow.name_returner}
                    onChange={handleChange}
                    required  autoComplete="off"/>
                </div>
                </div>
                </div>
                <div className='w-full flex gap-3 py-7 text-white text-xl'>
                <button onClick={handleReturn}  className='bg-blue-700 w-1/2 py-5 rounded-lg '>
                Submit
                </button>
                <button onClick={closeModal} className='bg-red-700 w-1/2 rounded-lg disabled:bg-red-700'>
                Cancel
                </button>
                </div>
                </div>
            </div>
                </>
            )}
   </body>
    )
}

export default BorrowReturnKey;