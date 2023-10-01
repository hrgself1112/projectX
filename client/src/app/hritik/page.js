'use client'

import React from 'react';
import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';


 const Hritik = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userr);

  // Update form data in Redux store when inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateuserr({ [name]: value }));
  };

  // Use formData from Redux store instead of local state
  const { title, keywords, description, url, /* other form fields */ } = users;

  // Render your form using the formData values
  // ...
return(

    <>
 
 <textarea rows="" name='title' onChange={handleInputChange} cols=""></textarea>
 <h1>
 {title}
 </h1>

<h2>
 {description}
</h2>
 
 
     </>
)
  
};

export default Hritik