import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/jsx/userContext';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Home from './components/Home/home';
import Visitorslog from './components/Visitors log/Visitorslog';
import LogEmployee from './components/Logemployee/Logemployee';
import EmployeeList from './components/Employeelists/EmployeeLists';
import EmployeesLog from './components/EmployeesLog/Employeeslog';
import RoomList from './components/Roomslist/Roomslist';
import BorrowReturnKey from './components/BorrowReturnKey/BorrowReturnKey';
import KeysLog from './components/KeysLog/Keyslog';
import LogoutVisitor from './components/LogoutVisitor/LogoutVisitor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <UserProvider>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logemployee" element={<LogEmployee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/employeelog" element={<EmployeesLog />} />
        <Route path="/borrowreturn" element={<BorrowReturnKey />} />
        <Route path="/roomlist" element={<RoomList />} />
        <Route path="/keyslog" element={<KeysLog />} />
        <Route path="/logoutvisitor" element={<LogoutVisitor />} />
        <Route path="/visitorslog" element={<Visitorslog />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </UserProvider>
  </>
);

reportWebVitals();
