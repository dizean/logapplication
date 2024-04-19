import React ,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import lccb from '../../images/lccb.png';
import calendaricon from '../../images/calendar.png';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Moment from "react-moment";
const KeysLog = () =>{
        // const { user } = useUser();
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [showBorrowers, setshowBorrowers] = useState(true); 
        const [borrowerData, setBorrowerData] = useState([]);
        const [startDate,setStartDate]= useState(new Date());
        const [endDate,setEndDate]= useState(new Date());
        const [filteredData, setFilteredData] = useState([]);
        const [filteredSearch, setFilteredSearch] = useState([]);
        useEffect(() => {
          const fetchData = async () => {
            try { 
              const response = await axios.get('http://localhost:3002/borrow/');
              const today = new Date().toISOString().split('T')[0];
              const filteredData = response.data.filter(borrow => borrow.date === today);
              setBorrowerData(filteredData);
              setSearchResults(filteredData);
            } catch (error) {
              console.error('Error fetching employee data:', error);
            }
          };
          fetchData();
        }, []);
        const [dateSelections, setDateSelections] = useState({
          selectedStartData: '',
          selectedEndDate:'',
        });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const handleSelect = async (date) =>{
          const response = await axios.get('http://localhost:3002/borrow/');
          const filtered = response.data.filter((borrow) => {
            const borrowDate = new Date(borrow.date);
            borrowDate.setHours(0, 0, 0, 0); 
            const selectedStartDate = new Date(date.selection.startDate);
            selectedStartDate.setHours(0, 0, 0, 0); 
            const adjustedStartDate = new Date(selectedStartDate);
          adjustedStartDate.setDate(selectedStartDate.getDate() + 1);
            const selectedEndDate = new Date(date.selection.endDate);
            selectedEndDate.setHours(23, 59, 59, 999);
            setDateSelections({selectedStartData: adjustedStartDate.toISOString().split('T')[0], selectedEndDate: selectedEndDate.toISOString().split('T')[0]})
            return borrowDate >= selectedStartDate && borrowDate <= selectedEndDate;
          });
          setStartDate(date.selection.startDate);
          setEndDate(date.selection.endDate);
          setSearchResults(filtered);
          setFilteredData(filtered);
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
          try {
            if (!filteredData.length){
              const response = await axios.post(`http://localhost:3002/borrow/search`, { searchTerm });
              const today = new Date().toISOString().split('T')[0];
              const filteredResults = response.data.filter(borrow => {
                if (searchTerm) {
                  return borrow.date === today;
                } else {
                  return borrow.date === today;
                }
              });
              setSearchResults(filteredResults);
            }
            else{
              const roomfiltered = filteredData.filter(rooms =>
                rooms.room.toUpperCase().includes(searchTerm.toUpperCase())
              );
              // const roomfiltered = filteredData.filter(rooms =>
              //   rooms.room.toUpperCase() === searchTerm.toUpperCase()
              // );
              
                setSearchResults(roomfiltered);
                setFilteredSearch(roomfiltered);
                console.log('sa search ni '+ value);
                console.log("Result"+roomfiltered);
          } }catch (error) {
            console.error('Error searching users:', error);
          }
        };
        
        const handleResetSearch = async () => {
          try {
            if (!filteredData.length){
            const response = await axios.get('http://localhost:3002/borrow/');
            const today = new Date().toISOString().split('T')[0];
            const filteredResults = response.data.filter(borrow => borrow.date === today);
            setSearchResults(filteredResults);
            setshowBorrowers(true);
            }
            else{
              const roomfiltered = filteredData.filter(rooms => rooms.room === searchTerm);
              console.log('secondcondition')
              setSearchResults(roomfiltered);
              setshowBorrowers(false);
            }
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
            setSearchResults(filteredData)
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
    Keys Log
   </header>
   <search className='w-full px-5 flex gap-3 '>
    <div className='w-2/3 flex flex-wrap gap-2'>
    <input
                type="text"
                className='bg-slate-100 w-2/5 py-4 px-5 rounded-lg focus:outline-none border-2 '
                placeholder="Search by room name or number"
                value={searchTerm}
                onChange={handleInputChange}
        />
        <button 
        className='w-2/12 h-16 flex text-xl justify-start items-center bg-blue-700 hover:bg-blue-500 hover:mix-blend-multiply text-white border-2 pl-2 rounded-lg'
        onClick={toggleDatePicker}>
          Filter by Date
                   {/* <img src={calendaricon} className='h-3/4 object-contain pl-14 py-2 rounded-xl'  alt="" /> */}
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
        <log className='w-1/3 gap-4 flex justify-end'>
            <ReactHTMLTableToExcel 
            id="download-table-button"
            table="tableemplo"
            filename={"Key Borrowers/Returners Log, Date - " + dateSelections.selectedStartData + " to " + dateSelections.selectedEndDate}
            sheet="tablexls"
            buttonText="Download Log Record"
            className='hover:bg-blue-500 text-white px-10 py-4  bg-blue-700 rounded-lg text-xl'/>
        </log>
   </search>
   <main className='w-full px-5 my-5 overflow-scroll h-[60vh]'>
   <table id="tableemplo" className='text-left w-full border-separate border border-slate-200'>
    <thead className='bg-blue-700 text-left text-white sticky top-0 z-9'>
        <tr className='h-16 text-xl'>
        
        <th className='  w-1/12'>Date Borrowed</th>
        <th className='  w-1/12'>Room</th>
        <th className='w-2/12'>Name of Borrower</th>
        <th className=' w-1/12'>Time Borrowed</th> 
        <th className=' w-2/12'>Name of Returner</th>
        <th className=' w-1/12'>Time Returned</th>               
        </tr>
    </thead>
    <tbody className=''>
    {searchResults.map((borrow, index) => (
        <tr 
        className={`text-xl h-10 ${index % 2 === 0 ? 'bg-blue-100 text-black' : 'bg-blue-300 text-black'}`}>
           
            <td className=''>
            <Moment format="MMMM DD, YYYY">
                {borrow.date}
            </Moment>
              </td>
              <td className=''>{borrow.room}</td>
            <td className=''>{borrow.name_borrower}</td>
            <td className=''>{borrow.time_borrowed}</td>
            <td className=''>{borrow.name_returner}</td>
            <td className=''>{borrow.time_returned}</td>
        </tr>
    ))}
    </tbody>
   </table>
   </main>
   </body>
    )
}

export default KeysLog;