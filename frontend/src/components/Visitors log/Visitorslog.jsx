import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import lccb from '../../images/lccb.png';
import calendaricon from '../../images/calendar.png';
import { useUser } from '../jsx/userContext';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const Visitorslog = () =>{
    const { user } = useUser(); 
    const [visits, Setvisits] = useState({
        date: '',
        name: '',
        purpose: '',
        place:'',
        gate:''
      });
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showVisitors, setshowVisitors] = useState(true);
      const [visitorsData, setVisitorsData] = useState([]);
      const [selectedGate, setSelectedGate] = useState('');
      const [startDate,setStartDate]= useState(new Date());
      const [endDate,setEndDate]= useState(new Date());
      const [filteredData, setFilteredData] = useState([]);
      const [userSelections, setUserSelections] = useState({
        selectedGateV: '',
        selectedDateV:'',
      });
      useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.get('http://localhost:3002/visits/');
            const today = new Date().toISOString().split('T')[0];
            const filteredData = response.data.filter(visits => visits.date === today);
            setVisitorsData(filteredData);
            setSearchResults(filteredData);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
        };
        fetchData();
      }, []);
      const handleFilterByGate = async (selectedGate) => {
        if (!filteredData.length)
        {
          if (selectedGate === '') { 
            setSearchResults(visitorsData); 
            setSearchTerm('');
          } else {
            const filteredgate = visitorsData.filter((visit) => visit.gate === selectedGate);
            setSearchResults(filteredgate);
            setUserSelections({...userSelections,
              selectedGateV: filteredgate,});
            setSearchTerm('');
            console.log('firstconditionni')
          }
        }
        else{
          const filteredGate = filteredData.filter(visits => visits.gate === selectedGate);
          if (selectedGate === '') { 
            setSearchResults(visitorsData); 
            setSearchTerm('');
          } else {
            console.log('secondcondition')
            setSearchResults(filteredGate);
            setUserSelections({...userSelections,selectedGateV: filteredGate});
            setSearchTerm('');
            console.log({...userSelections,selectedGateV: filteredGate});
          }
        }
       
      };
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const handleSelect = async (date) => {
        const response = await axios.get('http://localhost:3002/visits/');
        const filtered = response.data.filter((visit) => {
        const visitDate = new Date(visit.date);
        visitDate.setHours(0, 0, 0, 0);
        const selectedStartDate = new Date(date.selection.startDate);
        selectedStartDate.setHours(0, 0, 0, 0); 
        const selectedEndDate = new Date(date.selection.endDate);
        selectedEndDate.setHours(23, 59, 59, 999); 
        return visitDate >= selectedStartDate && visitDate <= selectedEndDate;
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setFilteredData(filtered);
    setSearchResults(filtered);
    setUserSelections({...userSelections,selectedDateV: filtered});
    console.log({...userSelections,selectedDateV: filtered});
    setSelectedGate('');
    setSearchTerm('');
    setIsDatePickerOpen(false);
      };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      };

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
      };

    const handleSearch = async (value) => {
    console.log(userSelections);
    try {
    let searchResults;

    if (!userSelections.selectedDateV.length && !userSelections.selectedGateV.length) {
      console.log('No data in both selectedDate and selectedGate');
      const response = await axios.post(`http://localhost:3002/visits/search`, { searchTerm });
      const today = new Date().toISOString().split('T')[0];
      searchResults = response.data.filter(visits => searchTerm ? visits.date === today : true); 
    } else if (userSelections.selectedDateV.length && !userSelections.selectedGateV.length) {
      console.log('Data in selectedDate and not selectedGate');
      searchResults = userSelections.selectedDateV.filter(visits =>
        visits.name.toUpperCase().includes(searchTerm.toUpperCase())
      );
    } else if (!userSelections.selectedDateV.length && userSelections.selectedGateV.length) {
      console.log('Data in selectedGate and not selectedDate');
      searchResults = userSelections.selectedGateV.filter(visits =>
        visits.name.toUpperCase().includes(searchTerm.toUpperCase())
      );
    } else { 
      console.log('Data in both selectedDate and selectedGate');
      searchResults = userSelections.selectedGateV.filter(visits =>
        visits.name.toUpperCase().includes(searchTerm.toUpperCase()) 
        
      );
    }

    setSearchResults(searchResults);
    setshowVisitors(false); 
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

      
      const handleResetSearch = async () => {
        try {
          let searchResults;
          if (!userSelections.selectedDateV.length && !userSelections.selectedGateV.length){
          const response = await axios.get('http://localhost:3002/visits/');
          const today = new Date().toISOString().split('T')[0];
          searchResults = response.data.filter(visits => visits.date === today); 
          }
          else if (userSelections.selectedDateV.length && !userSelections.selectedGateV.length) {
            console.log('Data in selectedDate and not selectedGate');
            searchResults = userSelections.selectedDateV.filter(visits =>
              visits.name.toUpperCase().includes(searchTerm.toUpperCase())
            );
          } else if (!userSelections.selectedDateV.length && userSelections.selectedGateV.length) {
            console.log('Data in selectedGate and not selectedDate');
            searchResults = userSelections.selectedGateV.filter(visits =>
              visits.name.toUpperCase().includes(searchTerm.toUpperCase())
            );
          }
          else{
            console.log('Data in both selectedDate and selectedGate');
            searchResults = userSelections.selectedGateV.filter(visits =>
              visits.name.toUpperCase().includes(searchTerm.toUpperCase()) 
              
            );
          }
          setSearchResults(searchResults);
          setshowVisitors(true); 
        } catch (error) {
          console.error('Error fetching all users:', error);
        }
      };
      
      const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        console.log('sa handle ni  '+ value);
        if (value === '') {
          handleResetSearch();
        } else {
          handleSearch(value);
        }
      };
      
      const today = new Date().toISOString().split('T')[0];
    return(
    <body className='h-screen w-screen relative'>
    <nav className='flex justify-between items-center bg-slate-100'>
      <div className='py-6 pl-5'>
      <img src={lccb} alt="lccb"/>
      </div>
      <div>
      <Link to="/home" className='bg-blue-700 hover:bg-blue-500 py-5 px-20 text-2xl text-white rounded-lg mr-3'>
          Back to main
      </Link>
      </div>
    </nav>
    <header className='py-8 pl-5 text-5xl font-semibold'>
      Visitors Log
    </header>
    <search className='w-full px-5 flex gap-3 '>
      <div className='w-2/3 flex flex-wrap gap-2 '>
      <input
                  type="text"
                  className='bg-slate-100 w-2/5 py-4 px-5 rounded-lg focus:outline-none '
                  placeholder="Search by name of visitor"
                  value={searchTerm}
                  onChange={handleInputChange}
          />
      <div className='flex w-2/5 gap-2'>
        <select id="gate"
        className='p-2 text-xl bg-slate-200 w-1/2 rounded-md focus:outline-none'
         name="gate" required value={selectedGate}  
         onChange={(e) => {
          setSelectedGate(e.target.value);
          handleFilterByGate(e.target.value);
        }}>
          <option value="">Select Gate</option>
          <option value="Galo Gate">Galo Gate</option>
          <option value="Rizal Gate">Rizal Gate</option>
        </select>
        <button 
        className='text-white w-2/12 h-16 flex justify-start items-center'
        onClick={toggleDatePicker}>
                   <img src={calendaricon} className='h-full object-contain p-2 bg-blue-400 hover:bg-blue-300 hover:mix-blend-overlay rounded-xl '  alt="" />
                    </button>
                    {isDatePickerOpen && (
                    <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    className='z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
                  />
                    )}
      </div>
    </div>
        <log className='w-1/3 gap-4 flex justify-end'>
            <ReactHTMLTableToExcel 
            id="download-table-button"
            className='hover:bg-blue-500 text-white px-10 py-4  bg-blue-700 rounded-lg text-xl'
            table="tableemplo"
            filename={"Visitors Log, Date - " + today}
            sheet="tablexls"
            buttonText="Download as XLS"/>
        </log>
   </search>
   <main className='w-full px-5 my-5 overflow-scroll h-[60vh]'>
   <table id= "tableemplo" className='text-left w-full border-separate border border-slate-200'>
    <thead className='bg-blue-700 text-left text-white sticky top-0 z-9'>
        <tr className='h-24 text-3xl'>
        <th>Date of Visit</th>
        <th>Name</th>
        <th>Purpose</th>
        <th>Place of Visit</th>
        <th>Time In</th>
        <th>Time Out</th>
        <th>Gate</th>              
        </tr>
    </thead>
    <tbody className='bg-green-300'>
    {searchResults.map((visits,index)=>{
      return(
        <tr className='text-2xl h-20' key={index}>
            <td>{visits.date}</td>
            <td>{visits.name}</td>
            <td>{visits.purpose}</td>
            <td>{visits.place}</td>
            <td>{visits.time_in}</td>
            <td>{visits.time_out}</td>
            <td>{visits.gate}</td>
        </tr>
    );
    })}
    </tbody>
   </table>
   </main>
   </body>
    )
}

export default Visitorslog;