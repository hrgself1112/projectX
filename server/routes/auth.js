

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { DatabaseArticles } = require('../models/register');



  

// Function to delete all files and subdirectories inside a directory
function deleteAllFilesAndSubdirectories(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        // If it's a directory, recursively delete it
        deleteAllFilesAndSubdirectories(itemPath);
      } else {
        // If it's a file, delete the file
        fs.unlinkSync(itemPath);
        console.log(`Deleted file: ${itemPath}`);
      }
    });
  }
}


router.get('/api/delete/savedPages', (req, res) => {
  const directoryPath = path.join(__dirname, '../savedPages'); // Change to your directory path
  console.log(directoryPath);

  // Use the recursive function to delete the directory and its contents
  deleteAllFilesAndSubdirectories(directoryPath);

  res.status(200).send('Directory and files deleted successfully');
});
router.get('/api/delete/savedData', (req, res) => {
  const directoryPath = path.join(__dirname, '../savedData'); // Change to your directory path
  console.log(directoryPath);

  // Use the recursive function to delete the directory and its contents
  deleteAllFilesAndSubdirectories(directoryPath);

  res.status(200).send('Deleted File Data');
});


router.post('/saveData',  (req, res) => {
  try {
    const { profilename, profileImageUrl, profileUrl, UniqueKey } = req.body;

    fs.readFile('./profiles/databyauthorname.json', 'utf-8', (readErr, data) => {
      if (readErr) {
        console.error(readErr);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Parse the existing data or initialize it as an empty array
        let existingData = [];

        if (data) {
          existingData = JSON.parse(data);
        }
        const newData = {
          profilename:profilename,
          uniqueKey:UniqueKey,
          uniqueFindingKey:UniqueKey,
        };

        existingData.push(newData);

         fs.writeFile('./profiles/databyauthorname.json', JSON.stringify(existingData, null, 2), (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(200).json({ message: 'Data saved successfully' });
          }
        });
      }
    });


    fs.readFile('./profiles/authorprofiledata.json', 'utf-8', (readErr, data) => {
      if (readErr) {
        console.error(readErr);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Parse the existing data or initialize it as an empty array
        let existingDatanew = {};

        if (data) {
          existingDatanew = JSON.parse(data);
        }

        let searchQuery = "search"+ UniqueKey
      
        // Create a new entry for the author using their UniqueKey as the key
        existingDatanew[UniqueKey] = {
          uniqueFindingKey: 'search' + UniqueKey,
          uniqueKey: UniqueKey,
          [searchQuery]: true,
          profilename: profilename,
          profileUrl: profileUrl,
          profileImageUrl: profileImageUrl,
        };

         fs.writeFile('./profiles/authorprofiledata.json', JSON.stringify(existingDatanew, null, 2), (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(200).json({ message: 'Data saved successfully' });
          }
        });
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }


  

  
});


// router.get("/preview/:" ,  (req, res)=>{
//   res.render('index');
// })




router.get('/api/savedfiles', (req, res) => {
const dataFolderPath = path.join(process.cwd(), 'savedData'); // Path to your data folder

  try {
    // Read the list of files in the "savedData" folder
    const fileNames = fs.readdirSync(dataFolderPath);

    // Send the file names as a JSON response
    res.status(200).json({ fileNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/api/savedPages', (req, res) => {
const dataFolderPath = path.join(process.cwd(), 'savedPages/amp'); // Path to your data folder

  try {
    const fileNames = fs.readdirSync(dataFolderPath);
    res.status(200).json({ fileNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



module.exports = router;
