"use client"
import { useState } from 'react';
function MyForm() {
  const [formData, setFormData] = useState({
    profilename: '',
    UniqueKey: "",
    profileUrl: '',
    profileImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8080/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Data saved successfully');
    } else {
      
      console.error('Error saving data');
    }
  };

  return (
<>
    
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="mx-auto max-w-2xl">
    <div className="text-center">
      <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
        Post a comment
      </h2>
    </div>
    <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">

    <form onSubmit={handleSubmit}>
        <div className="mb-4 sm:mb-8">
        
          <label htmlFor="hs-feedback-post-comment-name-2" 
         className="block mb-2 text-sm font-medium dark:text-white">Profile Name</label>
          <input onChange={handleChange} type="text" name='profilename' value={formData.profilename} id="hs-feedback-post-comment-name-1" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Author Name" />
        </div>
        <div className="mb-4 sm:mb-8">
          <label htmlFor="hs-feedback-post-comment-email-2" className="block mb-2 text-sm font-medium dark:text-white">UniqueKey Name</label>
          <input type="text"  name='UniqueKey' value={formData.UniqueKey}
        onChange={handleChange}
       id="hs-feedback-post-comment-email-2" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="UniqueKey Name" />
        </div>
        <div className="mb-4 sm:mb-8">
          <label htmlFor="hs-feedback-post-comment-email-3" className="block mb-2 text-sm font-medium dark:text-white">Author Url</label>
          <input type="text"   name='profileUrl'  value={formData.profileUrl}
        onChange={handleChange}
       id="hs-feedback-post-comment-email-3" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Author Url" />
        </div>
        <div className="mb-4 sm:mb-8">
          <label htmlFor="hs-feedback-post-comment-email-4" className="block mb-2 text-sm font-medium dark:text-white">Author Profile Image url</label>
          <input type="text" name='profileImageUrl'  value={formData.profileImageUrl}
        onChange={handleChange}
       id="hs-feedback-post-comment-email-4" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Author Profile Image url" />
        </div>
       
        <div className="mt-6 grid">
          <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
   
    </>

  );
}

export default MyForm;
