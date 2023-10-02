'use client'
import useFetch from "@/components/hooks/fetchHook";
import { AuthorByLangskeletons, AuthorByNameskeletons } from "@/components/skeletons/skeletons";
import React, { useState, useEffect } from "react";
import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import CkEditorProjectX from "@/components/ckEditor/ckEditorProjectX";


const beautify = require('js-beautify').html;

export const Form = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userr);

  const {title ,
    keywords
    ,description
    ,url
    ,h1
    ,schemaImgUrl
    ,content
    ,FaqBt
    ,ImageAlt
    ,year
    ,checkedOptions
    ,selectedLanguage
    ,isCheckedImage
    ,isCheckedFAQ
    ,whichYear ,
    formattedHTML ,
    editorData 
  } = user;


  // Handle CKEditor content change
  const handleEditorChange = (newData) => {
    // setEditorData(newData);
    dispatch(updateuserr({ editorData: newData }));
  };

// Function to remove empty tags, tags like <p>&nbsp;</p>, and all occurrences of &nbsp;
const processFormattedHTML = (html) => {
  // Remove empty tags
  
  // Remove <p>&nbsp;</p>
  const withoutNbspParagraphs = html.replace(/<p>(&nbsp;|\s*)<\/p>/g, '');

  // Remove <p> </p>
  const withoutSpaceParagraphs = withoutNbspParagraphs.replace(/<p>\s*<\/p>/g, '');

  return withoutSpaceParagraphs;
};


  
  useEffect(() => {
    // Format the CKEditor content with js-beautify
    try {
      const formatted = beautify(editorData, {
        indent_size: 2,
      });

      // Process the formatted HTML to replace empty tags
      const processedHTML = processFormattedHTML(formatted);
      // dispatch(updateuserr({ ...user, formattedHTML: processedHTML }));
      dispatch(updateuserr({ ...user, content: processedHTML }));
      
      
      
    } catch (error) {
      console.error('Error formatting HTML:', error);
      dispatch(updateuserr({ ...user, formattedHTML: editorData }));
    }
    
  }, [editorData]);

  function removeJsonExtension(fileNames) {
    // Use the `replace` method with a regular expression to remove ".json"
    const withoutExtension = fileNames.replace(/\.json$/, '');
    return withoutExtension;
  }

  const [ProfileDataHook, setProfileDataHook] = useState("")


  const [fileNamess, setFileNames] = useState([]);

  const [jsonData, setJsonData] = useState([]);

  const fetchDataList = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/savedfiles/${fileName}`);
      const data = await response.json();

      // Create a copy of the current user state
      const updatedUser = { ...user };

      // Iterate over the properties in the JSON data
      for (const key in data) {
        // Check if the property exists in the user state
        if (user.hasOwnProperty(key)) {
          // Update the property in the user state with the value from the JSON data
          updatedUser[key] = data[key];
        }
      }

      // Update the user state with the merged data
      setuser(updatedUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  // Update form data in Redux store when inputs change


  // Use formData from Redux store instead of local state

 

  const { data: LangAuthorr, isLoading: LangAuthorrisLoading, error: LangAuthorrerror } = useFetch('http://localhost:8080/api/data/databylanguagename'); // Adjust the URL
  const { data: AuthorMains, isLoading: AuthorMainsisLoading, error: AuthorMainserror } = useFetch('http://localhost:8080/api/data/databyauthorname'); // Adjust the URL
  const { data: ProfileData, isLoading: ProfileisLoadingData, error: ProfileerrorData } = useFetch('http://localhost:8080/api/data/authorprofiledata'); // Adjust the URL
  const { data: savedpages, isLoading: savedpagesisLoading, error: savedpageserror } = useFetch('http://localhost:8080/api/savedfiles'); // Adjust the URL





  useEffect(() => {
    // This will trigger a re-render, causing an infinite loop
    if (!ProfileisLoadingData && !ProfileerrorData) {
      const yourData = ProfileData; // Store the fetched data in a variable
      // console.log(yourData)
      setProfileDataHook(yourData)
      setFileNames(savedpages);
      // Now you can use 'yourData' in your component

    }

  }, [LangAuthorr, AuthorMains, ProfileData, savedpages, jsonData]);


  const handleYearChange = (year) => {
    dispatch(updateuserr(({...user, whichYear: year,})));
  };
  const handleCheckboxChange = (e) => {
    dispatch(updateuserr({ ...user, isCheckedImage: e.target.checked }));
  };
  const handleFAQChecked = (e) => {
    dispatch(updateuserr({ ...user, isCheckedFAQ: e.target.checked }));
  };
  // Event handler for the radio buttons
  const handleRadioChange = (event) => {
    dispatch(updateuserr({ ...user, selectedLanguage: event.target.value }));
    
  };

  const handleCheckbox = (name, checked) => {
    // Create a copy of the current checked options array
    let updatedCheckedOptions = [...user.checkedOptions];

    if (checked) {
      // If the checkbox is checked, add the corresponding data
      if (name in ProfileDataHook) {
        console.log(ProfileDataHook[name])
        updatedCheckedOptions.push(ProfileDataHook[name]);
        console.log(name);
      }
    } else {
      updatedCheckedOptions = updatedCheckedOptions.filter((option) => {
        if (name in ProfileDataHook) {
          // Check if the "unique" property matches the current language
          console.log(name)
          return option.uniqueKey !== name;
        }
        return true;
      });
    }
    dispatch(updateuserr({ ...user, checkedOptions: updatedCheckedOptions }));
  };


  const handleTextarea = (name ,  value ) => {
    dispatch(updateuserr({ [name]: value }));
  };


  const PostData = async (e) => {
    e.preventDefault();

    const { title, keywords, description, url, h1, whichYear, schemaImgUrl, content, checkedOptions, FaqBt, selectedLanguage, ImageAlt } = user;
    


    // Split the inputText into an array of lines
    const inputText = FaqBt
    const lines = inputText.split('\n');

    // Initialize an empty FAQ array to store questions and answers
    const FAQ = [];

    // Loop through the lines to extract questions and answers
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i].startsWith("/q+")) {
        const question = lines[i].substring(3); // Remove "/q+"
        const answer = lines[i + 1].substring(3); // Remove "/a+"
        FAQ.push({ question, answer });
      }
    }

    // Your HTML content
    const htmlContent = `${content}`;

    // Split the HTML content into sections based on <h2> tags
    const sections = htmlContent.split('<h2>');

    // Remove any empty sections
    const filteredSections = sections.filter(section => section.trim().length > 0);


    const withDivs = user.isCheckedImage
      ? filteredSections.map((section, index) => {
        if (index === 0) {
          // Add an image tag after the first paragraph
          return `<div class="card-view-content">${section.split('<p>').map((p, pIndex) => {
            if (pIndex === 1) {
              return `${p}               <div align="center">
                        <img src="/${user.whichYear}/images/${user.schemaImgUrl}" alt="${user.ImageAlt}" class="img-responsive" />
                </div><br />
        `;
            }
            return p;
          }).join('<p>')}</div>`;
        }
        return `<div class="card-view-content"><h2>${section}</div>`;
      })
      : filteredSections.map(section => `<div class="card-view-content"><h2>${section}</div>`);


    const withDivsAMP = user.isCheckedImage
      ? filteredSections.map((section, index) => {
        if (index === 0) {
          // Add an image tag after the first paragraph
          return `<div class="card-view-content">${section.split('<p>').map((p, pIndex) => {
            if (pIndex === 1) {
              return `${p}              <div>
            <amp-img src="/${user.whichYear}/images/${user.schemaImgUrl}" alt="${user.ImageAlt}" layout="responsive" width="1280" height="720"></amp-img>
                 </div>
            <br />\n`;
            }
            return p;
          }).join('<p>')}</div>`;
        }
        return `<div class="card-view-content"><h2>${section}</div>`;
      })
      : filteredSections.map(section => `<div class="card-view-content"><h2>${section}</div>`);

    const modifiedRealContent = withDivs.map((element, index) => {
      if (index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '<div class="card-view-content">');
      }
      else if (!index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '<div class="card-view-content">\n<h2>');
      }
      return element;
    });


    const modifiedRealContentAMP = withDivsAMP.map((element, index) => {
      if (index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '<div class="card-view-content">');
      }
      else if (!index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '<div class="card-view-content">\n<h2>');
      }
      return element;
    });

    // Join the sections to form the final HTML content
    const finalHtmlContent = modifiedRealContent.join('\n');
    const finalHtmlContentAMP = modifiedRealContentAMP.join('\n');


    const faqElementsAMP = FAQ.map((item, index) => (`{
              "@type": "Question",
              "name": "${item.question}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${item.answer}"
              }
            },`
    ));

    const faqRealHtmlNormalAMP = `
    <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [${faqElementsAMP.join('')}]
        }
   </script>
       `;


    const faqElements = FAQ.map((item, index) => (`                 
           <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">${item.question}</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                  <div itemprop="text">
                    <p>${item.answer}</p>
                  </div>
                </div>
             </div>
`
    ));


    const faqRealHtmlNormal = `
    <div class="card-view-content">
      <h2>${user.selectedLanguage != "" ? user.selectedLanguage : user.checkedOptions[0]['FaqLangH2']}</h2>
      <div itemscope itemtype="https://schema.org/FAQPage">
        ${faqElements.join('')}
        </div>
        </div>
    `;


    const faqRealHtmlNormalCheckedorUnchecked = user.isCheckedFAQ ? faqRealHtmlNormal : ""
    const faqRealHtmlNormalAMPCheckedorUnchecked = user.isCheckedFAQ ? faqRealHtmlNormalAMP : ""





    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       
          title,
          keywords,
          description,
          url,
          h1,
          schemaImgUrl,
          content, 
          ImageAlt, 
          checkedOptions ,
          faqRealHtmlNormalCheckedorUnchecked ,
         selectedLanguage , 
         finalHtmlContent ,
         finalHtmlContentAMP ,
         faqRealHtmlNormalAMPCheckedorUnchecked,
         whichYear , 
         FaqBt
         

      }),
    });
    if (!response.ok) {
      throw new Error("Response is not good")
    }
    if (response.ok) {
      console.log('Form Data saved successfully');
    } else {
      console.error('Error saving data');
    }
      
      
       }






  return (

    <>


      <section className="p-5">
        <div className="container">
          <form onSubmit={PostData}>


            <div className="flex flex-wrap">
              <div className="w-8/12">




              {/* <textarea rows="" name='title' onChange={handleInputChange} cols=""></textarea> */}




                <div className="flex flex-wrap">
                  <div className=" px-5 w-1/2 ">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Title
                      </label> 
                      <textarea name="title" onChange={(e) => handleTextarea("title", e.target.value)} value={user.title} className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Enter Title Here" />
                    </div>
                  </div>

                  <div className=" px-5 w-1/2 ">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Url
                      </label>
                      <textarea onChange={(e) => handleTextarea("url", e.target.value)} value={user.url} name="url" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Enter Url Here" />
                    </div>
                  </div>
                </div>


                <div className="flex flex-wrap">
                  <div className="w-1/2 px-5 ">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Keyword
                      </label>
                      <textarea onChange={(e) => handleTextarea("keywords", e.target.value)} value={user.keywords} name="keywords" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Enter Keyword Here" />
                    </div>
                  </div>

                  <div className="w-1/2 px-5 ">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Description
                      </label>
                      <textarea onChange={(e) => handleTextarea("description", e.target.value)} value={user.description} name="description" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Enter Description Here" />
                    </div>

                  </div>
                </div>



                <div className=" px-5 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      H1
                    </label>
                    <textarea onChange={(e) => handleTextarea("h1", e.target.value)} value={user.h1} name="h1" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Enter H1 Here" />
                  </div>
                </div>


                

       

                <div className="flex mx-4 my-5 w-1/3 items-center">
                              <input id={`ImagecCheck`} className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-200   rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-green-600 focus:ring-green-200 ring-offset-white focus:outline-none appearance-none dark:bg-gray-300 dark:checked:bg-green-600 dark:focus:ring-offset-gray-100  before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-[2px] before:translate-y-[1px] checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200 "
                                type="checkbox"
                                checked={user.isCheckedImage}
                                onChange={handleCheckboxChange}
                              />
                              <label for={`ImagecCheck`} className="text-sm cursor-pointer text-gray-500 ml-3 dark:text-gray-400">
                                Image 
                              </label>
                            </div>

                <div className="flex flex-wrap">

                  <div className="w-1/2 px-5 ">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Image Url
                      </label>
                      <textarea onChange={(e) => handleTextarea("schemaImgUrl", e.target.value)} value={user.schemaImgUrl} name="schemaImgUrl" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Enter Image url Here   2024/image.jpg" />
                    </div>
                  </div>

                  <div className=" px-5 w-1/2 ">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Image Alt
                      </label>
                      <textarea onChange={(e) => handleTextarea("ImageAlt", e.target.value)} value={user.ImageAlt} name="ImageAlt" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " id="name" type="text" placeholder="Image Alt" />
                    </div>
                  </div>
                </div>



<div style={{    padding:" 0px 1.2rem" ,
    marginBottom: "1.2rem"
}}>
                <CkEditorProjectX data={content} onChange={handleEditorChange} />
</div>
                <div className="mb-4 px-5 gridMakerLang ">
                  <input id="hs-medium-switch" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-200   rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-green-600 focus:ring-green-200 ring-offset-white focus:outline-none appearance-none dark:bg-gray-300 dark:checked:bg-green-600 dark:focus:ring-offset-gray-100  before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-[2px] before:translate-y-[1px] checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200 " type="checkbox" checked={user.isCheckedFAQ} onChange={handleFAQChecked} />
                  <label for="hs-medium-switch" className="text-sm text-gray-500 ml-3 dark:text-gray-400"> FAQ
                  </label>
                  <br />
                  <br />













                  <ul className="flex flex-col sm:flex-row">

                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-100 dark:border-gray-300 dark:text-white">
                      <div className="relative flex items-start w-full">
                        <div className="flex items-center h-5">

                          <input type="radio"
                            id="hindiLang"
                            className="border-gray-200 cursor-pointer rounded-full dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            name="language"
                            value="अक्सर पूछे जाने वाले प्रश्न"
                            checked={user.selectedLanguage === 'अक्सर पूछे जाने वाले प्रश्न'}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor="hindiLang" className="ml-3 cursor-pointer block w-full text-sm text-gray-600 dark:text-gray-500">
                            Hindi
                          </label>
                        </div>
                      </div>
                    </li>



                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-100 dark:border-gray-300 dark:text-white">
                      <div className="relative flex items-start w-full">
                        <div className="flex items-center h-5">

                          <input type="radio"
                            id="englishLang"
                            className="border-gray-200  cursor-pointer rounded-full dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            name="language"
                            value="Frequently Asked Questions:"
                            checked={user.selectedLanguage === 'Frequently Asked Questions:'}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor="englishLang" className="ml-3 cursor-pointer block w-full text-sm text-gray-600 dark:text-gray-500">
                            English
                          </label>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>


                <div className="mb-4 px-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Frequently Asked Question
                    <textarea onChange={(e) => handleTextarea("FaqBt", e.target.value)} value={FaqBt} name="FaqBt" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " rows={5} placeholder="/q+ =Question    /a+ =Answer" />
                  </label>
                </div>

              </div>


              <div className="w-4/12 " >
                <div>
                  <h3 className="mb-3">Choose Year</h3>
                  <ul className="flex flex-col sm:flex-row">
                    <li className="inline-flex  items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-100 dark:border-gray-300 dark:text-white">
                      <div className="relative flex items-start w-full">
                        <div className="flex  items-center h-5">
                          <input id="year2023"
                            className="border-gray-200 cursor-pointer rounded-full light:bg-white-800 dark:border-white-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            type="radio"
                            name="year"
                            value="2023"
                            checked={user.whichYear === '2023'}
                            onChange={() => handleYearChange('2023')}
                          />
                          <label className="ml-3 cursor-pointer block w-full text-sm text-gray-600 dark:text-gray-500" htmlFor="year2023">
                            2023
                          </label>
                        </div>
                      </div>
                    </li>

                    <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-100 dark:border-gray-300 dark:text-white">
                      <div className="relative flex items-start w-full">
                        <div className="flex items-center h-5">
                          <input id="year2024"
                            className="border-gray-200 cursor-pointer rounded-full dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            type="radio"
                            name="year"
                            value="2024"
                            checked={user.whichYear === '2024'}
                            onChange={() => handleYearChange('2024')}
                          />
                          <label className="ml-3 cursor-pointer block w-full text-sm text-gray-600 dark:text-gray-500" htmlFor="year2024">
                            2024
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <hr className="my-5 border border-3 " />
                <div>
                  <h3 className="mb-5 text-center">Choose Language</h3>
                  <div className="flex flex-wrap gap-y-3 ">

                    {
                      LangAuthorr ? (LangAuthorr.map((items, index) => {
                        return (
                          <>

                            <div className="flex w-1/3 items-center">
                              <input id={`CheckByLang${index}`} className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-200   rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-green-600 focus:ring-green-200 ring-offset-white focus:outline-none appearance-none dark:bg-gray-300 dark:checked:bg-green-600 dark:focus:ring-offset-gray-100  before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-[2px] before:translate-y-[1px] checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200 "
                                type="checkbox"
                                name={items.uniqueKey}
                                checked={user.checkedOptions.some((option) => Object.values(option).includes(items.uniqueFindingKey))}
                                onChange={(e) => handleCheckbox(`${items.uniqueKey}`, e.target.checked)}
                              />
                              <label for={`CheckByLang${index}`} className="text-sm cursor-pointer text-gray-500 ml-3 dark:text-gray-400">
                                {items.profilename}
                              </label>
                            </div>
                          </>
                        )
                      })) : <AuthorByLangskeletons />
                    }
                  </div>

                  <hr className="my-3 border border-3 " />
                  <div className="flex justify-center py-3"><h3 className="mb-3"> Direct By Author</h3></div>
                  <div className="flex flex-wrap gap-y-3">
                    {
                      AuthorMains ? (AuthorMains.map((items, index) => {
                        return (
                          <>
                            <div className="flex w-1/2 items-center">
                              <input id={`CheckByName${index}`} className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-200   rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-green-600 focus:ring-green-200 ring-offset-white focus:outline-none appearance-none dark:bg-gray-300 dark:checked:bg-green-600 dark:focus:ring-offset-gray-100  before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-[2px] before:translate-y-[1px] checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200 "
                                type="checkbox"
                                name={items.uniqueKey}
                                checked={user.checkedOptions.some((option) => Object.values(option).includes(items.uniqueFindingKey))}
                                onChange={(e) => handleCheckbox(`${items.uniqueKey}`, e.target.checked)}
                              />
                              <label for={`CheckByName${index}`} className="text-sm cursor-pointer text-gray-500 ml-3 dark:text-gray-400">
                                {items.profilename}
                              </label>
                            </div>
                          </>
                        )
                      })) : <AuthorByNameskeletons />
                    }
                  </div>
                </div>
              </div>


              <div className="flex px-3 items-center  w-[100%] my-10 justify-center">
                <input className="      bg-blue-500 hover:cursor-pointer w-[40%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"  value="submit" />
              </div>
            </div>
          </form>
        </div>
      </section>

    </>
  );
};
