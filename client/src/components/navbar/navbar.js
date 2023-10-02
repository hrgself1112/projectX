'use client'
import Buttons from "../button/buttons";
import React, { useState, useEffect } from "react";
import { RightSideBarskeletons } from "../skeletons/skeletons";
import useFetch from "@/components/hooks/fetchHook";


const Navbar = () => {
  const DeleteDirFiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/delete/savedPages');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const { data: savedpages, isLoading: savedpagesisLoading, error: savedpageserror , fetchData } = useFetch('http://localhost:8080/api/savedPages'); // Adjust the URL

  
  useEffect(() => {
    
    const fetchDataInterval = () => {
      fetchData(); // Fetch data using your useFetch hook
    };
        // Set up an interval to fetch data every 10 seconds
        const intervalId = setInterval(fetchDataInterval, 10000); // 10000 milliseconds = 10 seconds

        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };


  }, [ fetchData]);


  return (
    <>

      <div class="">


        <div className="bg-slate-700 px-10 py-3 ">
          <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-black-400 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-overlay-example">
            <svg class="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>


        <div id="hs-overlay-example" className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs  w-full z-[60] bg-white border-r dark:bg-gray-900 dark:border-gray-700 " tabIndex={-1}>


          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open="false">
            <ul className="space-y-1.5">


              <li><button data-hs-overlay="#hs-overlay-right" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300" >
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                View Saved Data
              </button>
              </li>

<hr/>
              
              
{
            savedpages && savedpages.fileNames ? (savedpages.fileNames.map((items , index) => {
              return (
                <>
              <li key={index}><button  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300" >
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                {items}
              </button>
              </li>
        
              </>
              )
            })) : <RightSideBarskeletons />
          }



              <div className="absolute bottom-4 my-3">
                <h3 className="text-white text-sm my-3">Delete .asp saved pages</h3>
                <button data-hs-overlay="#hs-static-backdrop-modalDeldiretory" className=" flex items-center gap-x-3.5 py-2 px-2.5 text-sm bg-gray-500  rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-100 dark:hover:text-slate-300 text-white" >Delete All files</button>
              </div>


            </ul>
          </nav>
        </div>
      </div>

      <div>


        <div id="hs-static-backdrop-modalDeldiretory" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
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

                <div className="w-40" onClick={DeleteDirFiles}>
                  <Buttons />
                </div>

                <button type="button" className="hs-dropdown-toggle w-40 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-static-backdrop-modalDeldiretory">
                  Cancel
                </button>



              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Navbar