

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { DatabaseArticles } = require('../models/register');
const JSZip = require('jszip');
const app = express()
const ejs = require('ejs');

const archiver = require('archiver');   

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


router.get('/downloadZipfileandData', async (req, res) => {
 // Your MongoDB data retrieval code here
const jsonData = await DatabaseArticles.find({});

const outputDirectory = path.join(__dirname, 'generatedFiles');
const outputDirectoryAMP = path.join(__dirname, 'generatedFiles', 'amp');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

if (!fs.existsSync(outputDirectoryAMP)) {
  fs.mkdirSync(outputDirectoryAMP, { recursive: true });
}

const archive = archiver('zip', {
  zlib: { level: 9 }
});

archive.on('error', (err) => {
  res.status(500).send({ error: err.message });
});

res.attachment('generatedFiles.zip');
archive.pipe(res);

for (let i = 0; i < jsonData.length; i++) {
  const data = jsonData[i];
  console.log(data)
  const filename = data.url.replace(/[^\w\s.-]/gi, '');

  // Render the EJS template with data
  const renderedHTML = await ejs.renderFile(path.join(__dirname,  '../views/template.ejs'), data );
  const renderedHTMLAMP = await ejs.renderFile(path.join(__dirname, '../views/amptemplate.ejs'),  data );

  // Write the rendered HTML content to ASP files with the correct extension
  fs.writeFileSync(path.join(outputDirectory, `${filename}.asp`), renderedHTML);
  fs.writeFileSync(path.join(outputDirectoryAMP, `${filename}.asp`), renderedHTMLAMP);

  // Add ASP files to the ZIP archive
  archive.file(path.join(outputDirectory, `${filename}.asp`), { name: `generatedFiles/${filename}` });
  archive.file(path.join(outputDirectoryAMP, `${filename}.asp`), { name: `generatedFiles/amp/${filename}` });
}

archive.finalize();
});


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
