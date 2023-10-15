


const fs = require('fs');
const path = require('path');
const { getCurrentFormattedDate, getCurrentFormattedTime, getamOrpm, getCurrentFormattedNumberDate } = require('../utils/date');

// Get the current date and time
const formattedDate = getCurrentFormattedDate();
const formattedTime = getCurrentFormattedTime();
const amOrpm = getamOrpm();
const FormattedNumberDate = getCurrentFormattedNumberDate();
const { v4: uuidv4 } = require('uuid');


const ejs = require('ejs');

const { DatabaseArticles } = require('../models/register');



const HandleUserRegReq = async(req, res)=>{

  try {
     const{
      title
      ,keywords
      ,description
      ,url
      ,h1
      ,schemaImgUrl
      ,ImageAlt
      ,isCheckedImage
      ,content
      ,year
      ,checkedOptions
      ,selectedLanguage
      ,FaqBt
      ,isCheckedFAQ
      ,whichYear
      ,editorData
      ,formattedHTML
      ,AMPfaq
      ,NormalFaq
      ,finalHtmlContent
      ,finalHtmlContentAMP 
    } = req.body

    console.log(req.body)
  const data = checkedOptions


  const firstItem = data[0];
  const profilename = firstItem.profilename;
  const profileUrl = firstItem.profileUrl;
  const profileImageUrl = firstItem.profileImageUrl;
  const ResLineOne = `<% Response.Charset="utf-8" %>`
  const Ressession = `<% session("topmenulink")="horoscope" %>`


  let imgresp = whichYear == "2023" ? "horoscope-2023.jpg" : whichYear == "2024" ? "horoscope-predictions-qoute-english.jpg" : ""
  const conditonalSchemaImage = schemaImgUrl === "" ? imgresp : schemaImgUrl


  let finalKeywords  = keywords != "" ? `\n\t<meta name="keywords" content="${keywords}" />` : ""

  function beautifyHtml(html) {
    const beautify = require('js-beautify').html;
    return beautify(html, {
      indent_size: 6,
      indent_with_tabs: true,
      preserve_newlines: true, // Preserve existing line breaks
      indent_inner_html: true,});
  }
    let finalHtmlContentAMPbeautify =  beautifyHtml(finalHtmlContentAMP)
    let finalHtmlContentbeautify =  beautifyHtml(finalHtmlContent)
    


  const templateData = {
    title,
    finalKeywords,
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
    AMPfaq,
    NormalFaq,
    finalHtmlContentAMP:finalHtmlContentAMPbeautify , 
    finalHtmlContent:finalHtmlContentbeautify
  }

  const ejsTemplate = fs.readFileSync(path.join(__dirname, '../views/template.ejs'), 'utf-8');
  const ampejsTemplate = fs.readFileSync(path.join(__dirname, '../views/amptemplate.ejs'), 'utf-8');

  const renderedTemplate = ejs.render(ejsTemplate, templateData);
  const amprenderedTemplate = ejs.render(ampejsTemplate, templateData);

  fs.writeFileSync(`./savedPages/${url}`, renderedTemplate);
  fs.writeFileSync(`./savedPages/amp/${url}`, amprenderedTemplate);

 function removeExtension(fileName) {
  if (fileName.endsWith('.asp')) {
    return fileName.slice(0, -4);
  }
  return fileName;
}

 const jsonDataFilePath = path.join(__dirname, '../savedData', `${removeExtension(url)}.json`);

 fs.writeFileSync(jsonDataFilePath, JSON.stringify(req.body, null, 2), 'utf-8');


 await DatabaseArticles.create({
  title:title,
  finalKeywords:finalKeywords,
  description:description,
  url:url,
  h1:h1,
  conditonalSchemaImage:conditonalSchemaImage,
  content:content,
  formattedDate:formattedDate,
  formattedTime:formattedTime,
  FormattedNumberDate:FormattedNumberDate,
  amOrpm:amOrpm,
  whichYear:whichYear,
  checkedOptions:checkedOptions,
  profilename:profilename,
  profileUrl:profileUrl,
  profileImageUrl:profileImageUrl,
  ResLineOne:ResLineOne,
  Ressession:Ressession,
  AMPfaq:AMPfaq,
  NormalFaq:NormalFaq,
  finalHtmlContentAMP:finalHtmlContentAMPbeautify,
  finalHtmlContent:finalHtmlContentbeautify

  })

  res.status(200).json({ message: 'Data saved successfully' });
    
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' }); 
}
}

const HandleUserRegReqGetAllRequest = async(req, res) =>{
    try {
      const data = await DatabaseArticles.find({})
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
}


const HandleUserRegReqGetAllRequestForTodayData = async(req, res) =>{

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Usage example:
  const date = new Date();
  const formattedDateNumber = formatDate(date);
  console.log(formattedDateNumber)
  const dateToSearch = formattedDateNumber; // Replace with the date you want to search for

  const startDate = new Date(dateToSearch);
  startDate.setHours(0, 0, 0, 0); // Start of the selected date (midnight)
  
  const endDate = new Date(dateToSearch);
  endDate.setHours(23, 59, 59, 999); // End of the selected date (just before midnight)
  
  const query = {
  createdAt: {
    $gte: startDate, // Greater than or equal to the start of the selected date
    $lte: endDate,   // Less than or equal to the end of the selected date
  }
};
    try {
      const data = await DatabaseArticles.find(query)
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
}

const HandleUserRegReqGetById = async( req, res) =>{
    const itemId = req.params.id;
    try {
      const data = await DatabaseArticles.findById(itemId);
      res.json(data)
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
  } 
}

const HandleUserRegReqPreviewGetById = async( req, res) =>{
    const itemId = req.params.id;
    try {
      const data = await DatabaseArticles.findById(itemId);
      res.render("index" , { data })    
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
  } 
}
const HandleUserRegReqPreviewGetByIdForAMP = async( req, res) =>{
    const itemId = req.params.id;
    try {
      const data = await DatabaseArticles.findById(itemId);
      res.render("ampindex" ,  data )    
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
  } 
}


const HandleUserRegReqWithPatchRequest = async( req, res) =>{
  const itemId = req.params.id;
  const updateFields = req.body; // Assuming the request body contains the fields to update


  try {
    const updatedItem = await DatabaseArticles.findByIdAndUpdate(itemId, updateFields, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    return res.json({ msg: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'An error occurred while updating the item' });
  }
}


const HandleUserRegReqWithDeleteRequest = async( req, res) =>{
    const itemId = req.params.id;
     await DatabaseArticles.findByIdAndDelete(itemId);
     return res.json({msg:"Successfully Deleted"})
}


module.exports = {
    HandleUserRegReq,   
    HandleUserRegReqGetAllRequest , 
    HandleUserRegReqGetById , 
    HandleUserRegReqPreviewGetById,
    HandleUserRegReqWithDeleteRequest , 
    HandleUserRegReqWithPatchRequest  , 
    HandleUserRegReqGetAllRequestForTodayData , 
    HandleUserRegReqPreviewGetByIdForAMP
}