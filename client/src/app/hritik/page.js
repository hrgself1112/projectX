'use client'
import React from 'react';


export async function fetchData() {
  const res = await fetch('http://localhost:8080/mongodata'); 
  return await res.json();
}



const handleClick= (e) =>{
const id  = e.target.id
console.log(id)
window.open(`http://localhost:8080/mongodata/${id}` , "_blank")
fetch(`/mongodata/${id}`)
    .then((response) => response.json())
    .then((data) => {    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

 const Hritik = async () => {
   const data  =  await fetchData()
   
  return(

    <>

{data && data.map((item) => (
        <div key={item._id}>
          {/* Display individual data items */}
          {/* You can access item properties like item.title, item.content, etc. */}
       <button onClick={handleClick} id={item._id} className="bg-red-100 my-3" >
           {item.title}
      </button>
        </div>
      ))}
 
     </>
)
  
};




export default Hritik