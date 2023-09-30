"use client"
import { useState } from 'react';
// FaceName
// TempName
// TempSearchName
// searchTamil
// uniqueKey
function MyForm() {
  const [formData, setFormData] = useState({
    profilename: '',
    profileUrl: '',
    profileImageUrl: "",
    UniqueKey: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the formData to your Express.js server
    const response = await fetch('http://localhost:8080/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Handle the response from the server
    if (response.ok) {
      // Data saved successfully
      console.log('Data saved successfully');
    } else {
      // Handle errors
      console.error('Error saving data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="profilename"
        value={formData.profilename}
        onChange={handleChange}
        placeholder="Author Name"
      />
      <input
        type="text"
        name="UniqueKey"
        value={formData.UniqueKey}
        onChange={handleChange}
        placeholder="UniqueKey Name"
      />
      <input
        type="text"
        name="profileUrl"
        value={formData.profileUrl}
        onChange={handleChange}
        placeholder="Author Url"
      />
      <input
        type="text"
        name="profileImageUrl"
        value={formData.profileImageUrl}
        onChange={handleChange}
        placeholder="Author Profile Image url"
      />
          
      {/* Add more input fields for other data */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
