// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import NavHome from "./Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import "../../App.css";
// import roomy from "../../images/Room.png";
// import locate from "../../images/loc.png";
// import status from "../../images/status.png";
// const CRUDrooms = () => {
//   const navigate = useNavigate();
//   const [room, Setroom] = useState({
//     room: "",
//     location: "",
//     status: "",
//   });
//   const [UpdateRoom, setUpdateRoom] = useState(false);
//   const [openRoom, setOpenRoom] = useState(false);
//   const openModalRooom = () => {
//     setOpenRoom(true);
//     Setroom({
//       room: "",
//       location: "",
//       status: "",
//     });
//   };
//   const openUpdateEmployee = (selectedRoom) => {
//     setselectedRoom(selectedRoom);
//     console.log(selectedRoom.id);
//     setUpdateRoom(true);
//   };
//   const closeModal = () => {
//     setUpdateRoom(false);
//     setOpenRoom(false);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const addRoom = {
//         ...room,
//         status: "Available",
//       };
//       const response = await axios.post("http://localhost:3002/room/", addRoom);
//       console.log(response.data);
//       closeModal();
//       navigate(0);
//     } catch (error) {
//       console.error("data data:", room);
//       console.error("data data:", error);
//     }
//   };

//   const updateRoom = async (selectedRoom) => {
//     if (!selectedRoom) {
//       alert("No selected employee");
//     }
//     try {
//       const response = await axios.put(
//         `http://localhost:3002/room/${selectedRoom.id}`,
//         room
//       );
//       alert("Successfully updated!");
//       closeModal();
//       navigate(0);
//     } catch (error) {
//       alert("Error updating employee:", error);
//     }
//   };

//   const deleteRoom = async (selectedRoom) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:3002/room/${selectedRoom.id}`
//       );
//       alert("Deleted successfully!");
//       closeModal();
//       navigate(0);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showRooms, setshowRooms] = useState(true);
//   const [roomData, setRoomData] = useState([]);
//   const [selectedRoom, setselectedRoom] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3002/room/");
//         setRoomData(response);
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };
//     fetchData();
//     if (selectedRoom) {
//       Setroom({
//         room: selectedRoom.room,
//         location: selectedRoom.location,
//         status: selectedRoom.status,
//       });
//     }
//   }, [selectedRoom]);
//   const handleSearch = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3002/room/search`, {
//         searchTerm,
//       });
//       setSearchResults(response.data);
//       setshowRooms(false);
//     } catch (error) {
//       console.error("Error searching users:", error);
//     }
//   };

//   const handleResetSearch = async () => {
//     try {
//       const response = await axios.get("http://localhost:3002/room/");
//       setSearchResults(response.data);
//       setshowRooms(true);
//     } catch (error) {
//       console.error("Error fetching all users:", error);
//     }
//   };
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value === "") {
//       handleResetSearch();
//     } else {
//       handleSearch();
//     }
//   };
//   const handleChange = (e) => {
//     Setroom({ ...room, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="employeelog">
//       <NavHome />
//       <div className="data-content">
//         <div className="title">
//           <div className="t-left">List of Rooms</div>
//           <div className="t-right">
//             <button onClick={openModalRooom}>Add Room</button>
//           </div>
//         </div>
//         <div className="search-bar">
//           <input
//             type="text"
//             className="search"
//             placeholder="Search by Room name or number ;"
//             value={searchTerm}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="data-container">
//           {searchResults.map((room) => (
//             <div className="data-grid" key={room.id}>
//               <div className="data-parent">
//                 <div className="personIcon">
//                   <img src={roomy} />
//                 </div>

//                 <div className="employee-content">
//                   <div className="employee-name">
//                     <p>Room Number:</p>
//                   </div>
//                   <div className="employee-data">
//                     <h2>{room.room}</h2>
//                   </div>
//                 </div>
//               </div>

//               <div className="data-parent">
//                 <div className="personIcon">
//                   <img src={status} />
//                 </div>

//                 <div className="employee-content">
//                   <div className="employee-name">
//                     <p>Availability Status:</p>
//                   </div>
//                   <div className="employee-data">
//                     <h2>{room.status}</h2>
//                   </div>
//                 </div>
//               </div>

//               <div className="data-parent">
//                 <div className="personIcon">
//                   <img src={locate} />
//                 </div>

//                 <div className="employee-content">
//                   <div className="employee-name">
//                     <p>Building Location:</p>
//                   </div>
//                   <div className="employee-data">
//                     <h3>{room.location}</h3>
//                   </div>
//                 </div>
//               </div>

//               <div className="log-buttons">
//                 <button
//                   onClick={() => openUpdateEmployee(room)}
//                   disabled={room.status === "Active"}
//                 >
//                   Update Room
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {openRoom && (
//         <>
//           <div className="modal-background"></div>
//           <div className="modalvisit">
//             <div className="visitform">
//               <h1>Fill up Form</h1>
//               <div className="name">
//                 <label htmlFor="name">Name of Room</label>
//                 <input
//                   type="text"
//                   name="room"
//                   required
//                   value={room.room}
//                   onChange={handleChange}
//                 ></input>
//               </div>
//               <div className="name">
//                 <label htmlFor="name">Location</label>
//                 <input
//                   type="text"
//                   required
//                   name="location"
//                   value={room.location}
//                   onChange={handleChange}
//                 ></input>
//               </div>
//               <div className="buttons">
//                 <button className="log" onClick={handleSubmit}>
//                   Add Room
//                 </button>
//                 <button className="cancel" onClick={closeModal}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {UpdateRoom && selectedRoom && (
//         <>
//           <div className="modal-background"></div>
//           <div id="update" className="update">
//             <div className="updateform">
//               <h1>Room Details</h1>
//               <div className="top">
//                 <div className="form-const">
//                   <label htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     name="room"
//                     value={room.room}
//                     onChange={handleChange}
//                   ></input>

//                   <div className="spec-div">

               
//                   <label htmlFor="status">Status</label>
//                   <br />

//                   <select
//                     id="status"
//                     name="status"
//                     required
//                     className="inputroom"
//                     value={room.status}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Status</option>
//                     <option value="Available">Available</option>
//                     <option value="Unavailable">Unavailable</option>
//                   </select>
                  
//                   </div>
//                    <br/>
//                   <label htmlFor="name">Location</label>
//                   <br/>

//                   <input
//                     type="text"
//                     name="location"
//                     value={room.location}
//                     onChange={handleChange}
//                   ></input>
//                 </div>

//                 {/* <div className="name">
//                         <label htmlFor="name">
//                            Name
//                         </label>
//                         <input type='text' name='room' value={room.room} onChange={handleChange}>

//                         </input>
//                     </div>
                    
//                     <div className="status-form">
//                         <label htmlFor="status">
//                             Status
//                         </label>
//                         <select id="status" name="status" required className="inputroom"value={room.status} onChange={handleChange} >
//                             <option value="">Select Status</option>
//                             <option value="Available">Available</option>
//                             <option value="Unavailable">Unavailable</option>
//                         </select>
//                     </div>
    
                  
//                     </div>
//                     <div className="top">
//                     <div className="name">
//                         <label htmlFor="name">
//                             Name
//                         </label>
//                         <input type='text' name='location' value={room.location} onChange={handleChange}>

//                         </input>
//                     </div>
//                     </div> */}
//               </div>

//               <div className="buttons">
//                 <button
//                   className="log"
//                   onClick={() => updateRoom(selectedRoom)}
//                 >
//                   Update Room Information
//                 </button>
//                 {/* <button className='log' onClick={() => deleteRoom(selectedRoom)}>
//                             Delete Room Information
//                         </button> */}
//                 <button className="cancel" onClick={closeModal}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CRUDrooms;
