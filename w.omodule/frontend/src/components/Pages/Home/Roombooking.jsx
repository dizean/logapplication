import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Keybooking.css'
import { Link } from "react-router-dom";
import imagePaths from "../imagepath";
import Sidebar from "./Sidebar";
import { useUser } from '../../jsx/userContext';

import UpdateBookings from "./UpdateBooking";

const Roombooking = () => {
  const { user } = useUser(); 
    const [book, Setbook] = useState({
        room_id: '',
        booked_date: '',
        booker_name: '',
        purpose: '',
        from_time: '',
        until_time: '',
        status: '',
        admin_assigned: 'none',
      });
      const resetBorrowState = () => {
        Setbook({
          room_id: '',
          booked_date: '',
          booker_name: '',
          purpose: '',
          from_time: '',
          until_time: '',
          status: '',
          admin_assigned: 'none',
        });
      };
      
      const [roomData, setRoomData] = useState([]);
      const [bookData, setBookData] = useState([]);
      const [selectedRoom, setSelectedRoom] = useState(null);
      const [isBookOpen, setIsBookOpen] = useState(false);
      const [isReturnOpen, setIsReturnOpen] = useState(false);
    
      useEffect(() => {
        const fetchData = async () => {
            try {
                const roomResponse = await axios.get('http://localhost:3002/room/');
                setRoomData(roomResponse.data);
                setSearchResults(roomResponse.data);
                if (selectedRoom) {
                    const bookResponse = await axios.get('http://localhost:3002/book/', {
                        params: {
                            room_id: selectedRoom.id,
                            status: 'Pending',
                        },
                    });
                    setBookData(bookResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedRoom]);
    
      const handleBookOpen = (room) => {
        setSelectedRoom(room);
        setIsBookOpen(true);
      };
    
      const handleReturnOpen = (room) => {
        setSelectedRoom(room);
        console.log('bookedate : ' + selectedBook.booked_date)
        setIsReturnOpen(true);
      };
    
      const closeModal = () => {
        setSelectedRoom(null);
        setIsBookOpen(false);
        setIsReturnOpen(false);
      };
       
      const selectedRoomId = selectedRoom ? selectedRoom.id : null;
      const selectedBook = bookData.find(book => book.room_id === selectedRoomId && book.status === 'Booked');
    
      const handleBook = async (e) => {
        e.preventDefault();
        try {
          
    
          const recordBook = {
            room_id: selectedRoom.id,
            booked_date: book.booked_date,
            booker_name: book.booker_name,
            purpose: book.purpose,
            from_time: book.from_time,
            until_time: book.until_time,
            status: 'Booked',
            admin_assigned: user.username,
          };
          
          
          const bookRes = await axios.post('http://localhost:3002/book/', recordBook);
    
          alert('Room Booked.');
          resetBorrowState();
          closeModal();
        } catch (error) {
          console.error('Error handling borrowing:', error);
        }
      };
      const handleChange = (e) => {
        Setbook({ ...book, [e.target.name]: e.target.value });
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
    return (
        <>
            <div className="home-wrapper">
                <Sidebar />
            </div>
            <div className='parent-home-container'>
                <div className="home-container-keybooking">
                <UpdateBookings/>
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
                        <div className="room-box" key={room.id}>
                            <p>{room.room}</p>
                            <button 
                            className="borrowbtn"
                            onClick={() => handleBookOpen(room)}
                        >
                            Borrow
                        </button>
                        </div>
                         ))}
                    </div>
                </div>
                {isBookOpen && (
  <div className='modal-overlay'>
    <div className='modal blue-theme'>
      <h1>Room Booking</h1>
      <form onSubmit={handleBook}>
        <label>
          Room Booker Name:
          <input
            type='text'
            name='booker_name'
            value={book.booker_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Purpose of Booking:
          <input
            type='text'
            name='purpose'
            value={book.purpose}
            onChange={handleChange}
          />
        </label>
        <label>
          Date Booked:
          <input
            type='date'
            name='booked_date'
            value={book.booked_date}
            onChange={handleChange}
          />
        </label>
        <label>
          From what time:
          <input
            type='time'
            name='from_time'
            value={book.from_time}
            onChange={handleChange}
          />
        </label>
        <label>
          Until what time:
          <input
            type='time'
            name='until_time'
            value={book.until_time}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Book Room</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

            </div>
        </>
    )
}

export default Roombooking;
