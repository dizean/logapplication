import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { useUser } from '../jsx/userContext';
import lccb from '../../images/lccb.png';
import keyicon from '../../images/doorway.png';
import statusicon from '../../images/time-management.png';
import locationicon from '../../images/pin.png';
import borrowicon from '../../images/deal.png';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
        setBorrow({
          room_id: '',
          room: '',
          date: '',
          name_borrower: '', 
          time_borrowed: '',
          name_returner: '',
          time_returned: '',
          status: '',
        });
      };
    const [roomData, setRoomData] = useState([]);
    const [borrowData, setBorrowData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isBorrowOpen, setIsBorrowOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const [isSuccessBorrow, setIsSuccessBorrow] = useState(false);
    const [isSuccessReturn, setIsSuccessReturn] = useState(false);
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
   
    const SuccessBorrow = () =>{
        setIsSuccessBorrow(true);
    }
    const SuccessReturn = () =>{
        setIsSuccessReturn(true);
    }
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
            status: 'Borrowed',
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
        resetBorrowState();
        closeModal();
        SuccessBorrow();
        setTimeout(() => {
            setIsSuccessBorrow(false);
        }, 3000);
        setTimeout(() => {
            navigate(0);
        }, 1000);
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
        resetBorrowState();
        closeModal();
        SuccessReturn();
        setTimeout(() => {
            setIsSuccessReturn(false);
        }, 3000);
        setTimeout(() => {
            navigate(0);
        }, 1000);
        } catch (error) {
        console.error('Error handling return:', error);
        }
    };

    const [selectedBorrowed, setSelectedBorrowed] = useState("all");

    const filterBorrowed = (value) => {
        setSelectedBorrowed(value);
    
      if (value === "all") {
        setSearchResults(roomData);
      } else {
        const filteredData = roomData.filter((room) => room.status === value);
        setSearchResults(filteredData);
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
    Rooms
   </header>
   <search className='w-full px-5 flex gap-3 justify-between'>
    <div className='flex w-2/3 gap-x-5  '>
    <input
                type="text"
                className='bg-slate-100 w-2/3 py-4 px-5 rounded-lg focus:outline-none border-2'
                placeholder="Search by room name or number"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <div className='flex items-center w-2/3 gap-x-3 '>
  <input
    type="radio"
    id="all"
    name="borrowed"
    value="all"
    className='size-6 '
    onChange={(e) => filterBorrowed(e.target.value)}
  />
  <label for="all">Display All</label>

  <input
    type="radio"
    id="borrowed"
    name="borrowed"
    value="Borrowed"
    className='size-6'
    onChange={(e) => filterBorrowed(e.target.value)}
  />
  <label for="Borrowed">Display Borrowed Keys</label>
</div>
    </div>
       
        <div className=' w-1/3 flex justify-end'>
            <Link to="/keyslog">
              <button className='hover:bg-blue-500 text-white px-10 py-4 mx-auto bg-blue-700 rounded-lg text-xl'>View Keys Log</button>
            </Link>
        </div>
   </search>
   <main className='w-full flex flex-wrap justify-center py-16  gap-x-[2rem] gap-y-3 '>
   {searchResults.map((room) => (
    <div className='bg-slate-200 w-1/6 flex flex-col p-3 gap-1 rounded-xl'>
        <div  className='flex gap-4 h-[70px] '>
            <div className='flex'>
                <img src={keyicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 h-full  flex flex-col '>
                <h1 className='text-xl h-[30px] leading-5'>Room</h1>
                <p className='text-xl font-bold line-clamp-2 leading-5'>{room.room}</p>
            </div>
        </div>
       
        {/* <div className='flex gap-4 justify-center items-center h-2/3'>
            <div className='flex justify-center w-1/3 '>
                <img src={locationicon} className='w-2/3' alt="" />
            </div>
            <div className='w-2/3 flex flex-col gap-y-2 '>
                <h1 className='text-xl'>Location</h1>
                <p className='text-2xl font-semibold line-clamp-2'>{room.location}</p>
            </div>
        </div> */}
        <div className='flex gap-4 h-[40px] items-center'>
            <div className='flex justify-center '>
                <img src={statusicon} className='w-[40px] h-[40px]' alt="" />
            </div>
            <div className='w-2/3 flex flex-col'>
                {/* <h1 className='text-l'>Status</h1> */}
                <p className='text-l font-bold leading-5'>{room.status}</p>
            </div>
        </div>
        <div className='w-full h-[50px] flex gap-3 pt-2 text-white text-base font-semibold '>
                <button 
                onClick={() => handleBorrowOpen(room)}
                disabled={room.status === 'Borrowed'}
                className='bg-blue-700 w-1/2 rounded-lg disabled:bg-blue-200'>
                  Borrow 
                </button>
                <button 
                 onClick={() => handleReturnOpen(room)}
                 disabled={room.status === 'Available'}
                className='bg-blue-700 w-1/2 rounded-lg disabled:bg-blue-200'>
                  Return 
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
    {isSuccessBorrow && 
    (
        <>
        <Snackbar open={true} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
        Borrowing Key Successful.
        </Alert>
        </Snackbar>
        </>
    )}
    {isSuccessReturn && 
    (
        <>
        <Snackbar open={true} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success">
       Returning Key Successful.
        </Alert>
        </Snackbar>
        </>
    )}
   </body>
    )
}

export default BorrowReturnKey;