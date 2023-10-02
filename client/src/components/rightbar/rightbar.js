'use client'
import useFetch from "@/components/hooks/fetchHook";
import React, { useState, useEffect } from "react";

import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RightSideBarskeletons } from "../skeletons/skeletons";
import Buttons from "../button/buttons";


const Rightbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userr);

  const { data: savedpages, isLoading: savedpagesisLoading, error: savedpageserror , fetchData } = useFetch('http://localhost:8080/api/savedfiles'); // Adjust the URL

  function removeJsonExtension(fileNames) {
    // Use the `replace` method with a regular expression to remove ".json"
    const withoutExtension = fileNames.replace(/\.json$/, '');
    return withoutExtension;
  }
 
  const [fileNamess, setFileNames] = useState([]);

  const fetchDataList = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/savedfiles/${fileName}`);
      const data = await response.json();

      // Create a copy of the current user state
      const updatedUser = { ...user };

      // Iterate over the properties in the JSON data
      for (const key in data) {
        // Check if the property exists in the user state
        if (user.hasOwnProperty(key)) {
          // Update the property in the user state with the value from the JSON data
          updatedUser[key] = data[key];
        }
      }

      dispatch(updateuserr(updatedUser));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
    
    
  };


  const DeleteDirFiless = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/delete/savedData');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    if (!savedpagesisLoading && !savedpageserror) {
      setFileNames(savedpages);
    }
    
    const fetchDataInterval = () => {
      fetchData(); // Fetch data using your useFetch hook
    };
        // Set up an interval to fetch data every 10 seconds
        const intervalId = setInterval(fetchDataInterval, 10000); // 10000 milliseconds = 10 seconds

        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };


  }, [savedpages , fetchData]);




  return (
    <>
      <div id="hs-overlay-right" className="hs-overlay  hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 right-0 transition-all duration-300 transform h-full max-w-xs w-full w-full z-[60] bg-white border-l dark:bg-gray-800 dark:border-gray-700 hidden" tabIndex={-1}>
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white">
            Saved Articles Data
          </h3>
          <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-overlay-right">
            <span className="sr-only">Close modal</span>
            <svg className="w-3.5 h-3.5" width={8} height={8} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
            </svg>
          </button>




          <div className="absolute bottom-4 my-3">
            <h3 className="text-white text-sm my-3">Delete  saved Profile Data</h3>
            <button data-hs-overlay="#hs-static-backdrop-modalDeldiretorysavefile" className=" flex items-center gap-x-3.5 py-2 px-2.5 text-sm bg-gray-500  rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-100 dark:hover:text-slate-300 text-white" >Delete All files</button>
          </div>

        </div>
        <div className="p-4">




          {
            fileNamess && fileNamess.fileNames ? (fileNamess.fileNames.map((items , index) => {
              return (
                <>
                  {/* <h3> {items}</h3> */}

                  <li key={index} style={{ width: "100%" }} onClick={() => fetchDataList(removeJsonExtension(items))} className="flex my-2 cursor-pointer w-100">
                    <div style={{ width: "100%" }} className="hs-accordion-toggle  flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-white rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900  dark:hs-accordion-active:text-white" href="javascript:;">
                      <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                        <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
                      </svg>
                      {items}
                      <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                    </div>
                  </li>


                </>
              )
            })) : <RightSideBarskeletons />
          }

        </div>
      </div>





      <div id="hs-static-backdrop-modalDeldiretorysavefile" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 px-10 overflow-y-auto">
              <p className="mt-1 text-gray-800 dark:text-gray-400">
                <h3 className="text-white text-2xl text-center">Are You Sure?</h3>
                <div className="crosoMki">
                  <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor"></path></svg>
                </div>
                <p className="text text-sm mt-3">Do you really want to delete these records? This process cannot be undone.</p>
              </p>
            </div>

            <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">

              <div className="w-40" onClick={DeleteDirFiless}>
                <Buttons />
              </div>

              <button type="button" className="hs-dropdown-toggle w-40 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-static-backdrop-modalDeldiretorysavefile">
                Cancel
              </button>



            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rightbar