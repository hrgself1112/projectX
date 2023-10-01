

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { getCurrentFormattedDate, getCurrentFormattedTime, getamOrpm, getCurrentFormattedNumberDate } = require('../utils/date');
const mammoth = require('mammoth'); // Install this library: npm install mammoth



const ejs = require('ejs');

// Get the current date and time
const formattedDate = getCurrentFormattedDate();
const formattedTime = getCurrentFormattedTime();
const amOrpm = getamOrpm();


const FormattedNumberDate = getCurrentFormattedNumberDate();

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


router.post('/saveData', async (req, res) => {
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

router.post('/register', (req, res) => {
  const { title, keywords, whichYear, description, url, h1, content, schemaImgUrl, checkedOptions, faqRealHtmlNormalCheckedorUnchecked, finalHtmlContent, finalHtmlContentAMP, faqRealHtmlNormalAMPCheckedorUnchecked } = req.body
console.log(req.body)
  const data = checkedOptions


  // Extracting values
  const firstItem = data[0];
  const profilename = firstItem.profilename;
  const profileUrl = firstItem.profileUrl;
  const profileImageUrl = firstItem.profileImageUrl;
  const ResLineOne = `<% Response.Charset="utf-8" %>`
  const Ressession = `<% session("topmenulink")="horoscope" %>`


  let imgresp = whichYear == "2023" ? "/images/horoscope-2023.jpg" : whichYear == "2024" ? "/images/horoscope-predictions-qoute-english.jpg" : ""
  const conditonalSchemaImage = schemaImgUrl === "" ? imgresp : schemaImgUrl

  console.log(profilename);


  // console.log(req.body)
  const templateData = {
    title,
    keywords,
    description,
    url,
    h1,
    conditonalSchemaImage,
    content,
    formattedDate,
    formattedTime,
    FormattedNumberDate,
    amOrpm,
    whichYear,
    checkedOptions,
    profilename,
    profileUrl,
    profileImageUrl,
    ResLineOne,
    Ressession,
    faqRealHtmlNormalAMPCheckedorUnchecked,
    faqRealHtmlNormalCheckedorUnchecked,
    finalHtmlContent,
    finalHtmlContentAMP
  };

  //  const templatePath = path.join(__dirname, '../views', 'template.ejs');
  //  const ejsTemplate = fs.readFileSync(templatePath, 'utf-8');
  const ejsTemplate = fs.readFileSync(path.join(__dirname, '../views/template.ejs'), 'utf-8');
  const ampejsTemplate = fs.readFileSync(path.join(__dirname, '../views/amptemplate.ejs'), 'utf-8');

  // Render the template with data
  const renderedTemplate = ejs.render(ejsTemplate, templateData);
  const amprenderedTemplate = ejs.render(ampejsTemplate, templateData);

  // Write the rendered HTML content to the file
  fs.writeFileSync(`./savedPages/${url}`, renderedTemplate);
  fs.writeFileSync(`./savedPages/amp/${url}`, amprenderedTemplate);
  //  fs.writeFileSync(, htmlContent)
 // Save req.body as a JSON file

 function removeExtension(fileName) {
  // Check if the file name ends with ".asp"
  if (fileName.endsWith('.asp')) {
    // Use slice to remove the last 4 characters (".asp")
    return fileName.slice(0, -4);
  }
  // If the file name doesn't end with ".asp", return it as is
  return fileName;
}

 const jsonDataFilePath = path.join(__dirname, '../savedData', `${removeExtension(url)}.json`);
 fs.writeFileSync(jsonDataFilePath, JSON.stringify(req.body, null, 2), 'utf-8');

 res.json({ message: 'Template and data saved successfully.' });
  res.json({ message: 'Template saved successfully.' });

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



module.exports = router;
