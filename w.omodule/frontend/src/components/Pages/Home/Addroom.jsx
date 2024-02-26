import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Keybooking.css'
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Addroom = () => {
    const navigate = useNavigate();
  const [room, Setroom] = useState({
    room: '',
    location: '',
    status: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('nagkadto na di');
    try {
      const addRoom = {
        ...room,
        status: 'Available'
      }
      const response = await axios.post('http://localhost:3002/room/', addRoom);
      console.log(response.data);
      navigate('/Keybooking');
    } catch (error) {
      console.error('data data:', room);
      console.error('data data:', error);
    }
  };

  const updateRoom = async (selectedRoom) => {
    if(!selectedRoom){
      alert('No selected employee');
    }
    alert(selectedRoom.id);
    try {
      const response = await axios.put(`http://localhost:3002/room/${selectedRoom.id}`, room);
      alert("Successfully updated!");
    } catch (error) {
      alert('Error updating employee:', error);
    }
  };

  const deleteRoom = async (selectedRoom) => {
    try {
      const response = await axios.delete(`http://localhost:3002/room/${selectedRoom.id}`);
      alert("Deleted successfully!")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showRooms, setshowRooms] = useState(true);
      const [roomData, setRoomData] = useState([]);
      const [selectedRoom, setselectedRoom] = useState(null);
      const [openModal,setOpenModal] = useState(false);
      useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get('http://localhost:3002/room/');
            setRoomData(response);
            setSearchResults(response.data);
          } catch (error) {
            console.error('Error fetching employee data:', error);
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
      const showSelect =  (selectedRoom) =>{

          setselectedRoom(selectedRoom);
          console.log(selectedRoom.id);
          setOpenModal(true);
      }
      const closeModal = () => {
        setOpenModal(false);
      }
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
        Setroom({ ...room, [e.target.name]: e.target.value });
      };
    return (
        <>
            <div className="home-wrapper">
                <Sidebar />
            </div>
            <div className='parent-home-container'>
                <div className="home-container-keybooking">
                    <h1 className="labelbooked">Add room</h1>
                    <form className="add-room-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label  className="labelroom" htmlFor="room">Room (Number/Name):</label>
                        <input type="text" id="room" name="room" required  className="inputroom" value={room.room} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="location" className="labelroom">Location:</label>
                        <input type="text" id="location" name="location" required className="inputroom" value={room.location} onChange={handleChange}/>
                        </div>
                        <button type="submit" className="addroombttn">Add Room</button>
                    </form>
                    <div>
                <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by name of employee "
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                    </div>
                    <div className="room-grid">
                    {searchResults.map((rooms) => (
                        <div className="room-box" key={rooms.id}>
                            <h1>{rooms.room}</h1>
                            <h3>{rooms.location}</h3>
                            <p>{rooms.status}</p>
                            <button
                                className="returnbttn"
                                onClick={() => showSelect(rooms)}
                            >
                               Update
                            </button>
                        </div>
                    ))}
                    </div>
                </div>
                {selectedRoom && openModal && (
    <>
        <h1 className="labelbooked">Add room</h1>
        <span onClick={closeModal}>Close</span>
        <div className="add-room-form">
            <div className="form-group">
                <label className="room" htmlFor="room">Room name:</label>
                <input type="text" id="room" name="room" required className="inputroom" value={room.room} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="location" htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" required className="inputroom" value={room.location} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="status" className="status">Status:</label>
                <select id="status" name="status" required className="inputroom" value={room.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
            </div>
            <button className="addroombttn" onClick={() => updateRoom(selectedRoom)} >Update Room Details</button>
            <button className="addroombttn" onClick={() => deleteRoom(selectedRoom)}>Delete Room Details</button>
        </div>
    </>
)}
                </div>
            </div>
        </>
    )
}

export default Addroom;
