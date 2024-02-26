import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../finalpages/navbar.css'
import { Link } from 'react-router-dom';
import LOGO from '../../images/lcc-logo.png';

const NavHome = () => {
    return (
        <div className='navbar'>
            <div className="nav">
            <div className='d-left'>
                <img src={LOGO}/>
            </div>
            <div className='d-right'>
                <Link to='/Dashboard'>
                Back to Home
                </Link>
            </div>
           </div>
        </div>
    )
}

export default NavHome;
