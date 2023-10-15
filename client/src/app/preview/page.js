'use client'
import useFetch from '@/components/hooks/fetchHook';
import React ,  {useEffect} from 'react';



const Hritik = () => {

  

  const handleClick= (e) =>{
  const id  = e.target.id
  console.log(id)
  window.open(`http://localhost:8080/register/${id}` , "_blank")
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

{data && data.map((item) => (
        <div key={item._id}>
       <button onClick={handleClick} id={item._id} className="bg-red-100 my-3" >
           {item.title}
      </button>
        </div>
      ))}
 
     </>
)
  
};




export default Hritik