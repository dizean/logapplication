import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHome from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../finalpages/logemployee.css";
import { useUser } from "../jsx/userContext";
import person from "../../images/person.png";
import classification from "../../images/classification.png";
import status from "../../images/status.png";
const LogEmployee = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  // const [employees, Setemployees] = useState({
  //   name: '',
  //   department: '',
  //   status: ''
  // });
  const [employeelog, Setemployeelog] = useState({
    date: "",
    name: "",
    time_in: "",
    time_out: "",
    admin_assigned: "",
    employee_id: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showEmployees, setshowEmployees] = useState(true);
  const [employeesData, setEmployeesData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesresponse = await axios.get(
          "http://localhost:3002/employees/"
        );
        setEmployeesData(employeesresponse.data);
        setSearchResults(employeesresponse.data);

        const employeeresponse = await axios.get(
          "http://localhost:3002/employee/"
        );
        setEmployeeData(employeeresponse.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [selectedEmployee]);

  const handleIn = async (selectedEmployee) => {
    console.log("Selected Employee:", selectedEmployee.id);
    setSelectedEmployee(selectedEmployee);
    if (!selectedEmployee) {
      console.error("No employee selected");
      return;
    }
    try {
      const recordEmployee = {
        date: new Date().toISOString().split("T")[0],
        employee_id: selectedEmployee.id,
        name: selectedEmployee.name,
        time_in: new Date().toLocaleTimeString(),
        time_out: "",
        admin_assigned: user.username,
        status: "In",
      };

      const response = await axios.post(
        "http://localhost:3002/employee/",
        recordEmployee
      );
      const updateEmployee = {
        ...selectedEmployee,
        work_status: "Active",
      };
      await axios.put(
        `http://localhost:3002/employees/${selectedEmployee.id}`,
        updateEmployee
      );

      alert("Logged in.");
      navigate(0);
      console.log(response.data);
    } catch (error) {
      console.error("Error logging employee:", error);
    }
  };

  const handleOut = async (selectedEmployee) => {
    try {
      if (!selectedEmployee) {
        alert("No employee selected.");
        return;
      }

      const updateEmployee = {
        ...selectedEmployee,
        work_status: "Inactive",
      };

      await axios.put(
        `http://localhost:3002/employees/${selectedEmployee.id}`,
        updateEmployee
      );

      const employeeToUpdate = employeeData.find(
        (employee) =>
          employee.employee_id === selectedEmployee.id &&
          employee.status === "In" &&
          employee.time_out === ""
      );

      if (!employeeToUpdate) {
        alert("No active log found for the selected employee.");
        return;
      }

      const updatedEmployeeLog = {
        ...employeeToUpdate,
        time_out: new Date().toLocaleTimeString(),
        status: "Out",
      };

      await axios.put(
        `http://localhost:3002/employee/${employeeToUpdate.id}`,
        updatedEmployeeLog
      );

      const updatedEmployeeData = employeeData.map((employee) =>
        employee.id === employeeToUpdate.id ? updatedEmployeeLog : employee
      );

      alert("Logged out.");
      navigate(0);
    } catch (error) {
      console.error("Error handling sign out:", error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3002/employees/search`,
        { searchTerm }
      );
      setSearchResults(response.data);
      setshowEmployees(false);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  const handleResetSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3002/employees/");
      setSearchResults(response.data);
      setshowEmployees(true);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      handleResetSearch();
    } else {
      handleSearch();
    }
  };
  // const handleChange = (e) => {
  //   Setemployees({ ...employees, [e.target.name]: e.target.value });
  // };
  return (
    <div className="employeelog">
      <NavHome />
      <div className="data-content">
        <div className="title">
          <div className="t-left">Employees Log</div>
          <div className="t-right">
            <Link to="/ViewEmployeeLog">
              <button>View Employees Log</button>
            </Link>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search"
            placeholder="Search by name of employee"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="data-container">
          {searchResults.map((employees) => (
            <div className="data-grid" key={employees.id}>
              <div className="data-parent">
                <div className="personIcon">
                  <img src={person} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Employee Name:</p>
                  </div>
                  <div className="employee-data">
                    <h3>{employees.name}</h3>
                  </div>
                </div>
              </div>
              <div className="data-parent">
                <div className="personIcon">
                  <img src={status} />
                </div>

                <div className="employee-content">
                  <div className="employee-name">
                  <p>Status:</p>
                  </div>
                  <div className="employee-data">
                    <h3>{employees.status}</h3>
                  </div>
                </div>
              </div>

              <h3>{employees.department}</h3>
            
              <div className="log-buttons">
                <button
                  onClick={() => handleIn(employees)}
                  disabled={employees.work_status === "Active"}
                >
                  Log in
                </button>
                <button
                  onClick={() => handleOut(employees)}
                  disabled={employees.work_status === "Inactive"}
                >
                  Log out
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogEmployee;
