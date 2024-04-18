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
            setSearchResults(userSelections.selectedDateV); 
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
      const [dateSelections, setDateSelections] = useState({
        selectedStartData: '',
        selectedEndDate:'',
      });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const handleSelect = async (date) => {
        const response = await axios.get('http://localhost:3002/visits/');
        const filtered = response.data.filter((visit) => {
        const visitDate = new Date(visit.date);
        visitDate.setHours(0, 0, 0, 0);
        const selectedStartDate = new Date(date.selection.startDate);
        selectedStartDate.setHours(0, 0, 0, 0); 
        const adjustedStartDate = new Date(selectedStartDate);
        adjustedStartDate.setDate(selectedStartDate.getDate() + 1);
        const selectedEndDate = new Date(date.selection.endDate);
        selectedEndDate.setHours(23, 59, 59, 999); 
        setDateSelections({selectedStartData: adjustedStartDate.toISOString().split('T')[0], selectedEndDate: selectedEndDate.toISOString().split('T')[0]})
        return visitDate >= selectedStartDate && visitDate <= selectedEndDate;
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    console.log(endDate);
    setFilteredData(filtered);
    setSearchResults(filtered);
    setUserSelections({...userSelections,selectedDateV: filtered});
    setSelectedGate('');
    setSearchTerm('');
      };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      };
      const closeDatepicker = () =>{
        setIsDatePickerOpen(false);
      }
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
            searchResults = userSelections.selectedDateV;
          } else if (!userSelections.selectedDateV.length && userSelections.selectedGateV.length) {
            console.log('Data in selectedGate and not selectedDate');
            searchResults = userSelections.selectedGateV;
          }
          else{
            console.log('Data in both selectedDate and selectedGate');
            searchResults = userSelections.selectedGateV;
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
    <nav className='flex justify-between items-center bg-slate-100 drop-shadow-lg'>
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
    <search className='w-full px-2 flex gap-2 '>
      <div className='w-9/12 flex flex-wrap gap-1 '>
      <input
                  type="text"
                  className='bg-slate-100 w-2/5 py-4 px-5 rounded-lg focus:outline-none border-2 '
                  placeholder="Search by name of visitor"
                  value={searchTerm}
                  onChange={handleInputChange}
          />
      <div className='flex w-2/5 gap-2'>
        <select id="gate"
        className='p-2 text-xl bg-slate-200 w-10/12 rounded-md focus:outline-none'
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
        className=' w-9/12 h-16 flex text-xl justify-start items-center bg-blue-700 hover:bg-blue-500 hover:mix-blend-multiply text-white border-2 pl-2 rounded-lg'
        onClick={toggleDatePicker}>
          Filter by Date
                   {/* <img src={calendaricon} className='h-3/4 object-contain pl-14 py-1  rounded-xl '  alt="" /> */}
                    </button>
                    {isDatePickerOpen && (
                      <div className='z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-6/12 bg-blue-700 rounded-lg'>
                        <h1
                         className='text-6xl text-white font-semibold py-10'
                        >Calendar</h1>
                        
                      <DateRangePicker
                    ranges={[selectionRange]}
                    className='rounded-lg'
                    onChange={handleSelect}
                  /><button 
                  className='bg-blue-700 w-full hover:bg-blue-500 py-5 text-2xl text-white rounded-b-lg '
                  onClick={closeDatepicker}>Close</button>
                      </div>
                    
                    )}
      </div>
    </div>
        <log className='w-3/12 gap-4 flex justify-end '>
            <ReactHTMLTableToExcel 
            id="download-table-button"
            className='hover:bg-blue-500 text-white px-10 py-4  bg-blue-700 rounded-lg text-xl'
            table="tableemplo"
            filename={"Visitors Log, Date - " + dateSelections.selectedStartData + " to " + dateSelections.selectedEndDate}
            sheet="tablexls"
            buttonText="Download Log Record"/>
        </log>
   </search>
   <main className='w-full px-5 my-5 overflow-scroll h-[60vh]'>
   <table id= "tableemplo" className='text-left w-full border-separate border border-slate-200'>
    <thead className='bg-blue-700 text-left text-white sticky top-0 z-9 '>
        <tr className='h-24 text-xl'>
        <th className='w-2/12 p-2'>Date of Visit</th>
        <th className='w-2/12 p-2'>Name</th>
        <th className='w-2/12 p-2'>Purpose</th>
        <th className='w-2/12 p-2'>Place of Visit</th>
        <th className='w-1/12 p-2'>Time In</th>
        <th className='w-1/12 p-2'>Time Out</th>
        <th className='w-1/12 p-2'>Gate</th>              
        </tr>
    </thead>
    <tbody className='bg-green-300'>
    {searchResults.map((visits,index)=>{
      return(
        <tr  key={index}
        className={`text-xl h-20 ${index % 2 === 0 ? 'bg-blue-100 text-black' : 'bg-blue-200 text-black'}`}>
            <td className='p-4'>{visits.date}</td>
            <td className='p-4'>{visits.name}</td>
            <td className='p-4'>{visits.purpose}</td>
            <td className='p-4'>{visits.place}</td>
            <td className='p-4'>{visits.time_in}</td>
            <td className='p-4'>{visits.time_out}</td>
            <td className='p-4'>{visits.gate}</td>
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