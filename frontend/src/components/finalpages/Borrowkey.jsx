import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHome from './Navbar';
import { Link , useNavigate} from 'react-router-dom';
import '../finalpages/logemployee.css';
import { useUser } from '../jsx/userContext';
import roomy from '../../images/Room.png';
import locate from '../../images/loc.png'
import status from '../../images/status.png'
const BorrowKey = () => {
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
    return (
        <div className='employeelog'>
            <NavHome/>
            <div className='data-content'>
            <div className='title'>
              <div className='t-left'>
                Borrow / Return Room Key
                </div>
              <div className='t-right'>
                    <Link to='/BorrowLog'>
                    <button>
                        View Borrowers Log
                    </button>
                    </Link>
                    </div>
            </div>
            <div className="search-bar">
                    <input
                    type="text"
                    className='search'
                    placeholder="Search by Room name or number ;"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <div className='data-container'>
            {searchResults.map((room) => (
            <div className="data-grid" key={room.id}>

                <div className="data-parent">
                <div className="personIcon">
                  <img src={roomy} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Room Number:</p>
                  </div>
                  <div className="employee-data">
                    <h3>{room.room}</h3>
                  </div>
                </div>
              </div>


              <div className="data-parent">
                <div className="personIcon">
                  <img src={status} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Availability Status:</p>
                  </div>
                  <div className="employee-data">
                    <h3>{room.status}</h3>
                  </div>
                </div>
              </div>

              <div className="data-parent">
                <div className="personIcon">
                  <img src={locate} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Building Location:</p>
                  </div>
                  <div className="employee-data">
                    <h3>{room.location}</h3>
                  </div>
                </div>
              </div>
         
              
          
              <div className='log-buttons'>
                <button
                onClick={() => handleBorrowOpen(room)}
                disabled={room.status === 'Unavailable'}
                >
                 Borrow Key
                </button>
                <button
                onClick={() => handleReturnOpen(room)}
                disabled={room.status === 'Available'}>
                  Return Key
                </button>
              </div>
            </div>
            ))}
            </div>
            </div>
            {isBorrowOpen &&
            (
                <>
                <div className="modalvisit">
                <div className='visitform'>
                    <h1>Provide name of Key Borrower</h1>
                    <div className="name">
                        <label htmlFor="name_borrower">
                           Name
                        </label>
                        <input type='text' name='name_borrower' value={borrow.name_borrower}
                         onChange={handleChange} required>
                        </input>
                    </div>
                    
                    <div className="buttons">
                        <button className='log' onClick={handleBorrow}>
                            Borrow
                        </button>
                        <button className='cancel' onClick={closeModal}>
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
                <div className="modalvisit">
                <div className='visitform'>
                    <h1>Provide name of Key Returner</h1>
                    <div className="name">
                        <label htmlFor="name">
                           Name
                        </label>
                        <input type='text' name='name_returner'
            value={borrow.name_returner}
            onChange={handleChange} required>

                        </input>
                    </div>
                    
                    <div className="buttons">
                        <button className='log' onClick={handleReturn}>
                           Return
                        </button>
                        <button className='cancel' onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
                </>
            )}
        </div>
    )
}

export default BorrowKey;
