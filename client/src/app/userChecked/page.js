'use client'

import React, { useState } from "react";

 const Page = () => {
    const [text, setText] = useState(""); // State variable to store the textarea content
  const data = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };

  // Function to handle textarea input changes
     const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  // Function to fill the textarea with the JSON data
  const fillTextareaWithData = () => {
    // Convert the JSON data object to a string and set it as the value of the textarea
    setText(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1>Textarea Example</h1>
      <textarea
        rows="5" // Set the number of rows
        cols="40" // Set the number of columns
        value={text} // Bind the textarea value to the state variable
        onChange={handleTextChange} // Call the function to handle input changes
        placeholder="Enter text here..." // Placeholder text
      />
      <p>You entered: {text}</p>
      <button onClick={fillTextareaWithData}>Fill Textarea with Data</button>
    </div>
      );
    }
    
    

export default Page