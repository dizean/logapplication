import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Pages/Signin/Signin';
import Signup from './components/Pages/Signup/Signup';
import { UserProvider } from './components/jsx/userContext';
import DashBoard from './components/finalpages/Dashboard';
import CRUDemployee from './components/finalpages/CRUDemployee';
import ViewLogEmployee from './components/finalpages/ViewEmployeeslog';
import LogEmployee from './components/finalpages/LogEmployee';
import BorrowKey from './components/finalpages/Borrowkey';
import ViewLogBorrowers from './components/finalpages/Viewborrowerslog';
import CRUDrooms from './components/finalpages/CRUDRooms';
import ViewLogVisitors from './components/finalpages/ViewVisitorslog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
{/* test push */}
  <UserProvider>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Dashboard" element={<DashBoard />} />
        <Route path="/LogEmployee" element={<LogEmployee />} />
        <Route path="/ViewEmployeeLog" element={<ViewLogEmployee />} />
        <Route path="/CrudEmployees" element={<CRUDemployee />} />
        <Route path="/Borrow" element={<BorrowKey />} />
        <Route path="/Borrowlog" element={<ViewLogBorrowers />} />
        <Route path="/CRUDrooms" element={<CRUDrooms />} />
        <Route path="/Visitorslog" element={<ViewLogVisitors />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </UserProvider>
  </>
);

reportWebVitals();
