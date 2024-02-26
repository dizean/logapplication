import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Keybooking.css'
import { Link } from "react-router-dom";
import imagePaths from "../imagepath";
import Sidebar from "./Sidebar";
import UpdateBookings from './UpdateBooking';
import { useUser } from '../../jsx/userContext';

const Keybooking = () => {
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
        alert('Key borrower recorded.')
        resetBorrowState();
        closeModal();
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
        alert('Room returned recorded.');
        const updatedBorrow = {
          ...selectedBorrow,
          name_returner:borrow.name_returner,
          time_returned: new Date().toLocaleTimeString(),
          status: 'Returned',
          
        };
        await axios.put(`http://localhost:3002/borrow/${selectedBorrow.id}`, updatedBorrow);

        alert('Key returned recorded.');
        resetBorrowState();
        closeModal();
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
    return (
        <>
            <div className="home-wrapper">
                <Sidebar />
            </div>
            <div className='parent-home-container'>
                <div className="home-container-keybooking">
                    {/* <UpdateBookings/> */}
                    <h1 className="labelrooms">Rooms</h1>
                    <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by Room name or number ;"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                    </div>
                    <div className="room-grid">
                    {searchResults.map((room) => (
                        <div className="room-box" >
                            <p>{room.room}</p>
                            <button
                            className="borrowbtn"
                            onClick={() => handleBorrowOpen(room)}
                            disabled={room.status === 'Unavailable'}
                        >
                            Borrow
                        </button>
                        <button
                        className="returnbttn"
                        onClick={() => handleReturnOpen(room)}
                        disabled={room.status === 'Available'}
                    >
                        Return
                    </button>
                        </div>
                    ))}
                    </div>
                </div> 
                {isBorrowOpen && (
  <div className='modal-overlay'>
    <div className='modal blue-theme'>
      <h1>Information of Borrower</h1>
      <form onSubmit={handleBorrow}>
        <label>
          <p>Name Borrower:</p>
          <input
            type='text'
            name='name_borrower'
            value={borrow.name_borrower}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Borrow Room Key</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

      {isReturnOpen && selectedBorrow && (
  <div className='modal-overlay'>
    <div className='modal blue-theme'>
    <h1>Information of Borrower</h1>
      <form onSubmit={handleReturn}>
        <label>
          Name of Returner:
          <input
            type='text'
            name='name_returner'
            value={borrow.name_returner}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Return Key</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)} 
            </div>
        </>
    )
}

export default Keybooking;
