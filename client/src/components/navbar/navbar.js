'use client'
import Buttons from "../button/buttons";
import React, { useEffect ,useRef } from "react";
import { RightSideBarskeletons } from "../skeletons/skeletons";
import useFetch from "@/components/hooks/fetchHook";
import Page from "@/app/upload/page";

import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import {AiOutlineFileText} from "react-icons/ai"
import {HiOutlinePencil} from "react-icons/hi"
const Navbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userr);
const btnClickRefNavbarClose = useRef(null)

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

  const { data: savedpages, isLoading: savedpagesisLoading, error: savedpageserror , fetchData } = useFetch('http://localhost:8080/register'); // Adjust the URL

  
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

  const HandlerUpdate = async (value) => {

    try {
      const response = await fetch(`http://localhost:8080/register/${value}`);
      const data = await response.json();
      console.log("Data from API:", data);
  
      const updatedUser = { ...user };
      for (const key in data) {
        if (user.hasOwnProperty(key)) {
          updatedUser[key] = data[key];
        }
      }
  
      dispatch(updateuserr({ ...updatedUser, tempSid: value }));
      
      if (value) {
        if (btnClickRefNavbarClose.current) {
          btnClickRefNavbarClose.current.click();
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <>


      <div class="">
        <div className="bg-slate-700 px-10 py-3 ">
          <button type="button" className="py-3   px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-black-400 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-overlay-example">
            <svg class="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>

          <div className="inline-block ml-10">
          <Page/>
          </div>

        </div>

        <div id="hs-overlay-example" className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-[60%]  w-full z-[60] bg-white border-r dark:bg-gray-900 dark:border-gray-700 " tabIndex={-1}>


          <nav className="hs-accordion-group makignitscroll p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open="false">
            <ul className="space-y-1.5">

            <button type="button"  style={{display:"none"}} ref={btnClickRefNavbarClose}       className="inline-flex  flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-overlay-example">
            <span className="sr-only">Close modal</span>
            </button>



              <li>
                <button data-hs-overlay="#hs-overlay-right" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300" >
                Navigation
              </button>
              </li>
              

<hr/>
              
              
{
            savedpages ? (savedpages.map((items , index) => {
              return (
                <>
              <li  key={index}>
                <button   className="flex relative w-[65%] whitespace-nowrap overflow-hidden text-ellipsis items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md hover:bg-gray-100 cursor-default dark:hover:bg-gray-700 dark:text-slate-400 dark:hover:text-slate-300" >
                <AiOutlineFileText/>
                {items.url}

                  <span id={items._id} onClick={()=>HandlerUpdate(items._id)}  title="update" className="p-1 absolute right-5 cursor-pointer hover:text-black rounded-lg hover:bg-slate-50"> <HiOutlinePencil/> </span>
                  

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