'use client'
import useFetch from '@/components/hooks/fetchHook';
import React, { useEffect ,useState , useRef } from 'react';

import DateRangePickerComponent from '../datepicker/DatePicker';
import { UpdateOneWayState } from '@/redux/slice/onewaystateSlice';
import { useDispatch, useSelector } from 'react-redux';



const Hritik = () => {

  const [isVisible, setIsVisible] = useState(false);



  const dispatch = useDispatch();
  const DateFinder = useSelector((state) => state.dateFinder);
  const OneWayState = useSelector((state) => state.OneWayState)

  const [selectedIds, setSelectedIds] = useState([]);

  const {IdsToDownloadDataByCheck} =  OneWayState 

  const handleDownloadZip = async () => {
    console.log(IdsToDownloadDataByCheck)
    window.open(`http://localhost:8080/download-Zipfile-Data?DownloadAricleByIDs=${IdsToDownloadDataByCheck}`)
  }
  const [message, setMessage] = useState('');

  const handleDeleteClick = async () => {
      const itemIds = [1, 2, 3, 4, 5]; // Replace with your actual array of item IDs

      try {
          const response = await fetch(`http://localhost:8080/register/deletefiles?DownloadAricleByIDs=${IdsToDownloadDataByCheck}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ids: itemIds }),
          });

          if (response.ok) {
              const data = await response.json();
              setMessage(data.msg);
              toggleVisibility()
            } else {
              setMessage('Failed to delete items');
            toggleVisibility()
          }
        } catch (error) {
          setMessage('An error occurred while making the request');
          toggleVisibility()
      }
  };
  const handleClick = (id) => {
   
    window.open(`http://localhost:8080/register/preview/${id}`, "_blank")
  }
  
  const handleButtonClick = (event ,id) => {
    
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, `${id},`]);
    }
  
        if (event.ctrlKey && event.shiftKey) {
      alert('You pressed Ctrl+Shift+Click!');
    }
  };

  
  const { data: data, isLoading: dataisLoading, error: dataerror, fetchData } = useFetch(`http://localhost:8080/register/today?startDate=${DateFinder.startdateFinder}&endDate=${DateFinder.enddateFinder}`); // Adjust the URL

  useEffect(() => {


    const fetchDataInterval = () => {
      fetchData();
  
    };
    const intervalId = setInterval(fetchDataInterval, 10000);

    return () => {
      clearInterval(intervalId);
    };


  }, [fetchData ]);
  
  useEffect(() => {
      
    const updateList = () =>{
      const uniqueIdsSet = new Set(selectedIds.map(id => id.replace(/,$/, '')));
      const uniqueIdsArray = Array.from(uniqueIdsSet);
      dispatch(UpdateOneWayState({IdsToDownloadDataByCheck:uniqueIdsArray}));
    }
  
    updateList();
  }, [selectedIds]);

   const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  console.log(IdsToDownloadDataByCheck )
  return (

    <>
     <main    style={{ zIndex:99,  display: isVisible ? 'block' : 'none' }} class="antialiased bg-gray-50 text-gray-900  top-0 left-0 right-0 w-100 h-[100vh] sticky font-sans overflow-x-hidden">
  <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
    <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
    <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
      <div class="md:flex items-center">
        <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
          <i class="bx bx-error text-3xl"></i>
        </div>
        <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p class="font-bold">Delete your data</p>
          <p class="text-sm text-gray-700 mt-1">You will lose all of your data by deleting your account. This action cannot be undone.
          </p>
        </div>
      </div>
      <div class="text-center md:text-right mt-4 md:flex md:justify-end">
        <button onClick={handleDeleteClick} class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">Delete
            Account</button>
        <button onClick={()=>toggleVisibility()} class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1">Cancel</button>
      </div>
    </div>
  </div>
</main>
      <div className="p-5">

        <DateRangePickerComponent />

        <br /><hr /> <br />
        <h2 className='text-2xl mb-5 px-3'>Articles Links</h2>



        {data && data.map((item) => (
          <div className="" key={item._id}>
            
            <label for={item._id} className="max-w-[60%] flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
    <input type="checkbox" id={item._id} onClick={(event)=>handleButtonClick(event , item._id)} className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checkedf:border-blue-500 dark:focus:ring-offset-gray-800"/>
    <span onClick={()=>handleClick(item._id)}  class="text-sm text-slate-50 ml-3 hover:cursor-pointer dark:text-gray-400">{item.title}</span>
  </label>

          </div>
        ))}

      </div>

      <div className='mx-5 mb-20 mt-10'>
        <button onClick={handleDownloadZip} className='rounded-lg mr-5 bg-blue-700 p-3 text-white'>Downlaod All files </button>
      
        <button onClick={()=>toggleVisibility()} className='rounded-lg ml-5 bg-blue-700 p-3 text-white'>Delete Files </button>
      
      </div>



     
    </>
  )

};




export default Hritik