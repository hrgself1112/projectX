

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { getCurrentFormattedDate, getCurrentFormattedTime ,  getamOrpm , getCurrentFormattedNumberDate } = require('../utils/date');

const ejs = require('ejs');

  // Get the current date and time
  const formattedDate = getCurrentFormattedDate();
  const formattedTime = getCurrentFormattedTime();
  const amOrpm = getamOrpm();
  const FormattedNumberDate = getCurrentFormattedNumberDate();

router.post('/register', (req, res) => {
  const { title, keywords, description, url , h1 , content, schemaImgUrl , checkedOptions } = req.body

  const data = checkedOptions
  
  // Extracting values
  const firstItem = data[0]; 
  const profilename = firstItem.profilename;
  const profileUrl = firstItem.profileUrl;
  const profileImageUrl = firstItem.profileImageUrl;
  const ResLineOne = `<% Response.Charset="utf-8" %>`
  const Ressession = `<% session("topmenulink")="horoscope" %>`

  const conditonalSchemaImage = schemaImgUrl === ""  ? "2024/images/horoscope-predictions-qoute-english.jpg" : schemaImgUrl
  
console.log(profilename);
console.log(req.body)
  const templateData = {
    title,
    keywords,
    description,
    url,
    h1,
    conditonalSchemaImage,
    content,
    formattedDate ,
    formattedTime ,
    FormattedNumberDate,
    amOrpm, 
    checkedOptions,
     profilename , 
    profileUrl , 
    profileImageUrl ,
    ResLineOne , 
    Ressession
};

//  const templatePath = path.join(__dirname, '../views', 'template.ejs');
//  const ejsTemplate = fs.readFileSync(templatePath, 'utf-8');
 const ejsTemplate =fs.readFileSync(path.join(__dirname, '../views/template.ejs'), 'utf-8');
 const ampejsTemplate =fs.readFileSync(path.join(__dirname, '../views/amptemplate.ejs'), 'utf-8');

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
  