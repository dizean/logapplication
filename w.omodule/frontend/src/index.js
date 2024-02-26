import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Pages/Signin/Signin';
import Signup from './components/Pages/Signup/Signup';
import Home from './components/Pages/Home/Home';
import Keybooking from './components/Pages/Home/Keybooking';
import Roombooking from './components/Pages/Home/Roombooking';
import VisitorLog from './components/Pages/Home/Visitorlog';
import Addroom from './components/Pages/Home/Addroom';
import { UserProvider } from './components/jsx/userContext';
import EmployeeLog from './components/Pages/Home/Employeelog';
import ViewEmployeeLog from './components/Pages/Home/ViewEmployeesLog';
import ViewBorrowers from './components/Pages/Home/ViewBorrowers';
import ViewVisitors from './components/Pages/Home/ViewVisitorsLog';
import CRUDEmployees from './components/Pages/Home/CRUDEmployee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <UserProvider>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Keybooking" element={<Keybooking />} />
        <Route path="/Roombooking" element={<Roombooking />} />
        <Route path="/Visitorlog" element={<VisitorLog />} />
        <Route path="/Addroom" element={<Addroom />} />
        <Route path="/EmployeeLog" element={<EmployeeLog />} />
        <Route path="/ViewEmployeeLog" element={<ViewEmployeeLog />} />
        <Route path="/ViewBorrowers" element={<ViewBorrowers />} />
        <Route path="/ViewVisitors" element={<ViewVisitors />} />
        <Route path="/CrudEmployees" element={<CRUDEmployees />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </UserProvider>
  </>
);

reportWebVitals();
