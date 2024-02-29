import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../images/lcc-logo.png";
import { useUser } from "../jsx/userContext";

import iconemploy from "../../images/icon-employ.png";
import iconkey from "../../images/ph_key.png";
import iconvisit from "../../images/Visitor.png";
import visitImg from "../../images/FormIcon.png"
const DashBoard = () => {
  const { user } = useUser();
  const [openVisit, setOpenvisit] = useState(false);
  const openModalVisit = () => {
    setOpenvisit(true);
  };
  const closeModal = () => {
    setOpenvisit(false);
  };
  const [visits, Setvisits] = useState({
    date: "",
    name: "",
    purpose: "",
    place: "",
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
      });
      closeModal();
    } catch (error) {
      alert("error");
      console.error("data data:", error);
    }
  };

  const handleChange = (e) => {
    Setvisits({ ...visits, [e.target.name]: e.target.value });
  };
  return (
    <div className="dashboard">
      <div className="dashnav">
        <div className="d-left">
          <img src={LOGO} />
        </div>
        

         
          <Link to="/" className="SignOutBtn">
          <div className="dash-right">Sign Out </div>
          </Link>
       
      </div>

      <div className="dash">
        <div className="employee">
          <div className="icon-employee-cont">
            <div className="icon-employ">
              <img src={iconemploy} />
            </div>

            <div className="employ-title-desc">
              <div className="title-employ">
                <h1>
                  Employee<br></br>Management
                </h1>
              </div>
              <div className="title-desc">
                <p>
                  Supporting employees through oversight, tracking, and tasks
                  like attendance monitoring, performance evaluation, and
                  record-keeping.
                </p>
              </div>
            </div>
          </div>

          <div className="nav-links-container">
            <div className="BUTTONS">
              <Link to="/LogEmployee">
                <button className="click-btn">Log Employee</button>
              </Link>
              <Link to="/CRUDEmployees">
                <button className="click-btn">
                Lists of Employee
                </button>
              </Link>

              <Link to="/ViewEmployeeLog">
                <button className="click-btn">Employees Log</button>
              </Link>
            </div>
          </div>

          {/* <div className='links'>
                <div className='log'>
                    
                    <Link to='/LogEmployee'>
                    <button>
                    Log Employee
                    </button>
                    </Link>
                    
                    
                </div>
                <div className='crud'>
                <Link to='/CRUDEmployees'>
                    <button>
                    Create, Update, Delete Employee Information
                    </button>
                    </Link>
                   
                </div>
                <div className='view'>
                <Link to='/ViewEmployeeLog'>
                <button>
                        View Employees Log
                    </button>
                    </Link>
                    
                </div>
            </div> */}
        </div>

        <div className="employee">
          <div className="icon-employee-cont">
            <div className="icon-employ">
              <img src={iconkey} />
            </div>

            <div className="employ-title-desc">
              <div className="title-employ">
                <h1>
                  Room<br></br>Management
                </h1>
              </div>
              <div className="title-desc">
                <p>
                Streamlining space organization, including room allocation, resource scheduling, maintenance tracking, and maximizing facility usage.
                </p>
              </div>
            </div>
          </div>

          <div className="nav-links-container">
            <div className="BUTTONS">
              <Link to='/Borrow'>
                <button className="click-btn">Borrow/Return Room Key</button>
              </Link>
              <Link to='/CRUDrooms'>
                <button className="click-btn">
                 Room Information
                </button>
              </Link>

              <Link to='/Visitorslog'>
                <button className="click-btn">Room Borrowers/Returners Log</button>
              </Link>
            </div>
          </div>

        </div>


        <div className="employee">
          <div className="icon-employee-cont">
            <div className="icon-employ">
              <img src={iconvisit} />
            </div>

            <div className="employ-title-desc">
              <div className="title-employ">
                <h1>
                  Visitor<br></br>Management
                </h1>
              </div>
              <div className="title-desc">
                <p>
                Managing guest interactions, including registration, access control, activity monitoring, and ensuring a secure and welcoming environment.
                </p>
              </div>
            </div>
          </div>

          <div className="nav-links-container">
            <div className="BUTTONS">

            <Link onClick={openModalVisit}>
                <button className="click-btn">Log Visitors</button>
              </Link>

              <Link to="/Visitorslog">
                <button className="click-btn">Visitors Log</button>
              </Link>
            
            </div>
          </div>

        </div>

        {openVisit && (
        <>
         <div className="modal-background"></div>
          <div className="modalvisit">
            <div className="visitform">

              <div className="visitform-img">
                <img src={visitImg}/>
          
              </div>
          <div className="frm-title">
          <h1>Visitors Log Forms</h1>
            </div> 

              <div className="name">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ex. Juan Dela Cruz"
                  value={visits.name}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="purpose">
                <label htmlFor="purpose">Purpose:</label>
                <input
                  type="text"
                  name="purpose"
                  placeholder="input purpose here"
                  value={visits.purpose}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="purpose">
                <label htmlFor="place">Place to Visit:</label>
                <input
                  type="text"
                  name="place"
                  value={visits.place}
                  placeholder="input place here"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            

            <div className="form-buttons">
              <div className="form-btn">
              
             
                <button className="cancel" onClick={closeModal}>
                  Cancel
                </button>

                <button className="log" onClick={handleSubmit}>
                  Log Visitor
                </button> 
              </div>
         
            </div>
                
             
            </div>
          </div>
        </>
      )}
        
       


        


        
      </div>
      
    </div>
  );
};

export default DashBoard;
