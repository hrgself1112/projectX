'use client'
import useFetch from '@/components/hooks/fetchHook';
import React ,  {useEffect} from 'react';



const Hritik = () => {

  const handleDownloadZip = async()=>{
    window.open(`http://localhost:8080/downloadZipfileandData`)
  }
   
  const handleClick= (e) =>{
  const id  = e.target.id
  console.log(id)
  window.open(`http://localhost:8080/register/preview/${id}` , "_blank")
}
   
   const { data: data, isLoading: dataisLoading, error: dataerror , fetchData } = useFetch('http://localhost:8080/register/today'); // Adjust the URL

   
   useEffect(() => {
    const fetchDataInterval = () => {
      fetchData(); 
    };
        const intervalId = setInterval(fetchDataInterval, 10000); 
        return () => {
          clearInterval(intervalId);
        };


  }, [ fetchData]);
  return(

    <>
<div className="p-5">
  <h2 className='text-2xl mb-5 px-3'>Articles Links</h2>

{data && data.map((item) => (


<div key={item._id}>
       <a onClick={handleClick} id={item._id} className="my-1 py-1 px-3 border rounded-lg  border-slate-800 cursor-pointer inline-block" >
           {item.title}
      </a>
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