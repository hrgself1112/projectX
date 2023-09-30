

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { getCurrentFormattedDate, getCurrentFormattedTime, getamOrpm, getCurrentFormattedNumberDate } = require('../utils/date');

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



router.post('/saveData', async (req, res) => {
  console.log(req.body)
  let { profilename, profileImageUrl, profileUrl, UniqueKey } = req.body
  try {
    // Get the submitted data from the request body
    const formData = profilename;

    // Load existing data from the JSON file (if it exists)
    fs.readFile('./profiles/AuthorMains.json', 'utf-8', (readErr, data) => {
      if (readErr) {
        // Handle errors, e.g., file doesn't exist or read error
        console.error(readErr);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Parse the existing data
        let existingData = [];
        // console.log(existingData);
        if (data) {
          existingData = JSON.parse(data);
        }

        // console.log(existingData);
        console.log("hiiii")


        // Add the new data to the existing data
        existingData.push({
          profilename: profilename,
          profileUrl: profileUrl,
          profileImageUrl: profileImageUrl,
          uniqueKey: UniqueKey, 
        });
          

        let sourceData = {
          profilename: 'John',
          profileImageUrl: 'image.jpg',
          profileUrl: 'example.com/john',
          UniqueKey: '12345'
        };
        
        // Get an array of keys and values
        let keys = Object.keys(sourceData);
        let values = Object.values(sourceData);
        
        // Create an object from the keys and values with the replacements
        let dynamicObject = {};
        for (let i = 0; i < keys.length; i++) {
          // Conditionally replace the key UniqueKey with UniqueKeySearch
          let key = keys[i] === 'UniqueKey' ? 'UniqueKeySearch' : keys[i];
        
          // If the key is profilename, concatenate UniqueKeySearch with the value
          let value = key === 'profilename' ? 'UniqueKeySearch' + values[i] : values[i];
        
          dynamicObject[key] = value;
        }
        
        // Push the dynamicObject into an array
        // let existingData = [];
        existingData.push(dynamicObject);
        
        console.log(existingData);
        
        // Save the updated data (including existing and new data) back to the JSON file
        fs.writeFile('./profiles/AuthorMains.json', JSON.stringify(existingData, null, 2), (writeErr) => {
          if (writeErr) {
            // Handle errors, e.g., write error
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
})
router.post('/register', (req, res) => {
  const { title, keywords, whichYear, description, url, h1, content, schemaImgUrl, checkedOptions, faqRealHtmlNormalCheckedorUnchecked, finalHtmlContent, finalHtmlContentAMP, faqRealHtmlNormalAMPCheckedorUnchecked } = req.body

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


  res.json({ message: 'Template saved successfully.' });

});




module.exports = router;
