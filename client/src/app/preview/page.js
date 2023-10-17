'use client'
import useFetch from '@/components/hooks/fetchHook';
import React, { useEffect ,useState } from 'react';

import DateRangePickerComponent from '../datepicker/DatePicker';
import { UpdateOneWayState } from '@/redux/slice/onewaystateSlice';
import { useDispatch, useSelector } from 'react-redux';



const Hritik = () => {

  const dispatch = useDispatch();
  const DateFinder = useSelector((state) => state.dateFinder);
  const OneWayState = useSelector((state) => state.OneWayState)

  const [selectedIds, setSelectedIds] = useState([]);

  const {IdsToDownloadDataByCheck} =  OneWayState 

  const handleDownloadZip = async () => {
    console.log(IdsToDownloadDataByCheck)
    window.open(`http://localhost:8080/download-Zipfile-Data?DownloadAricleByIDs=${IdsToDownloadDataByCheck}`)
  }

  const handleClick = (id) => {
   
    window.open(`http://localhost:8080/register/preview/${id}`, "_blank")
  }
  
  const handleButtonClick = (event ,id) => {
    
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, `${id},`]);
    }
    

    // console.log(uniqueIdsArray)
      // console.log(uniqueIdsSet)
      // const uniqueIdsArray = Array.from(uniqueIdsSet);

      // const uniqueIdsSet = new Set(selectedIds.map(id => id.replace(/,$/, '')));
      // // console.log(uniqueIdsSet)
      // dispatch(UpdateOneWayState({IdsToDownloadDataByCheck:uniqueIdsArray}));


    // Dispatch an action to update the Redux state
    // dispatch(updateuserr({ ...user, IdsToDownloadDataByCheck: e.target.checked }));

        if (event.ctrlKey && event.shiftKey) {
      alert('You pressed Ctrl+Shift+Click!');
    }
  };

  
  const { data: data, isLoading: dataisLoading, error: dataerror, fetchData } = useFetch(`http://localhost:8080/register/today?startDate=${DateFinder.startdateFinder}&endDate=${DateFinder.enddateFinder}`); // Adjust the URL



  
  // console.log(selectedIds)
  
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

  console.log(IdsToDownloadDataByCheck )
  return (

    <>
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

      <div className='mx-5'>
        <button onClick={handleDownloadZip} className='rounded-lg bg-blue-700 p-3 text-white'>Downlaod All files </button>
      </div>
    </>
  )

};




export default Hritik