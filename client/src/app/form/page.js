'use client'
import { LangAuthor   , AuthorMains} from "@/components/proMap";
import React, { useState } from "react";

export const Form = () => {
  const [user, setuser] = useState({
    title: "",
    keywords: "",
    description: "",
    url: "",
    h1: "",
    schemaImgUrl: "",
    content: "" , 
    FaqBt:"" ,
    ImageAlt:"" ,
    year:"" , 
    checkedOptions: [], 
    selectedLanguage:"" ,
    isCheckedImage: false , // Initialize to false
    isCheckedFAQ: false  , // Initialize to false
    whichYear: "", 
  });

  const handleYearChange = (year) => {
    setuser((prevUser) => ({
      ...prevUser,
      whichYear: year, // Update whichYear when a radio button is selected
    }));
  };
  const handleCheckboxChange = (e) => {
    setuser({ ...user, isCheckedImage: e.target.checked });
  };
  const handleFAQChecked = (e) => {
    setuser({ ...user, isCheckedFAQ: e.target.checked });
  };
 // Event handler for the radio buttons
 const handleRadioChange = (event) => {
  setuser({ ...user, selectedLanguage: event.target.value });
};

const handleCheckbox = (name, checked) => {
  // Create a copy of the current checked options array
  let updatedCheckedOptions = [...user.checkedOptions];
 
if (checked) {
  // If the checkbox is checked, add the corresponding data
  if (name === "Tamil") {
    updatedCheckedOptions.push(require("@/components/profile").Tamil);
  } else if (name === "Telugu") {
    updatedCheckedOptions.push(require("@/components/profile").Telugu);
  } else if (name === "Gujarati") {
    updatedCheckedOptions.push(require("@/components/profile").Gujarati);
  } else if (name === "Marathi") {
    updatedCheckedOptions.push(require("@/components/profile").Marathi);
  } else if (name === "Malayalam") {
    updatedCheckedOptions.push(require("@/components/profile").Malayalam);
  } else if (name === "Odia") {
    updatedCheckedOptions.push(require("@/components/profile").Odia);
  } else if (name === "Assamesse") {
    updatedCheckedOptions.push(require("@/components/profile").Assamesse);
  } else if (name === "Kannada") {
    updatedCheckedOptions.push(require("@/components/profile").Kannada);
  } else if (name === "Bengali") {
    updatedCheckedOptions.push(require("@/components/profile").Bengali);
  } else if (name === "Urdu") {
    updatedCheckedOptions.push(require("@/components/profile").Urdu);
  }
   else if (name === "Mragaank") {
    updatedCheckedOptions.push(require("@/components/profile").Mragaank);
  }
   else if (name === "Hariharan") {
    updatedCheckedOptions.push(require("@/components/profile").Hariharan);
  }
   else if (name === "Prashansa") {
    updatedCheckedOptions.push(require("@/components/profile").Prashansa);
  }
} else {
  updatedCheckedOptions = updatedCheckedOptions.filter((option) => {
    switch (name) {
      case "Tamil":
        return !("searchTamil" in option);
      case "Telugu":
        return !("searchTelugu" in option);
      case "Gujarati":
        return !("searchGujarati" in option);
      case "Marathi":
        return !("searchMarathi" in option);
      case "Malayalam":
        return !("searchMalayalam" in option);
      case "Odia":
        return !("searchOdia" in option);
      case "Assamesse":
        return !("searchAssamesse" in option);
      case "Kannada":
        return !("searchKannada" in option);
      case "Bengali":
        return !("searchBengali" in option);
      case "Urdu":
        return !("searchUrdu" in option);
      case "Mragaank":
        return !("searchMragaank" in option);
      case "Hariharan":
        return !("searchHariharan" in option);
      case "Prashansa":
        return !("searchPrashansa" in option);
   
      default:
        return true;
    }
  });
}


  // Update the state with the new checked options
  setuser({ ...user, checkedOptions: updatedCheckedOptions });

  
};

const handleTextarea = (name, value) => {
  // Handle textarea input separately
  setuser({ ...user, [name]: value });
};

    const PostData = async (e) => {
      
      e.preventDefault();
    const { title, keywords, description, url, h1, whichYear, schemaImgUrl, content, checkedOptions , FaqBt ,selectedLanguage , ImageAlt } = user;


    console.log(whichYear)
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
      <h2>${user.selectedLanguage!= "" ? user.selectedLanguage : user.checkedOptions[0]['FaqLangH2']}</h2>
      <div itemscope itemtype="https://schema.org/FAQPage">
        ${faqElements.join('')}
        </div>
        </div>
    `;


      const faqRealHtmlNormalCheckedorUnchecked = user.isCheckedFAQ ? faqRealHtmlNormal : ""
      const faqRealHtmlNormalAMPCheckedorUnchecked = user.isCheckedFAQ ? faqRealHtmlNormalAMP : ""




    
    const res = await fetch("http://localhost:8080/register", {
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
       whichYear
       
      }),
    });
    
    const ResData = await res.json();
    // console.log(ResData.status);
  }
    
    




  return (

    <>

      <section className="p-5">
        <div className="container">
          <form method="POST">


            <div className="flex flex-wrap">
              <div className="w-8/12">


            <div className="flex flex-wrap">
                <div className=" px-5 w-1/2 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Title
                    </label>
                    <textarea name="title"  onChange={(e) => handleTextarea("title", e.target.value)} value={user.title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Title Here" />
                  </div>
                </div>

                <div className=" px-5 w-1/2 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Url
                    </label>
                    <textarea  onChange={(e) => handleTextarea("url", e.target.value)} value={user.url} name="url" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Url Here" />
                  </div>
                </div>
                </div>


                <div className="flex flex-wrap">
                <div className="w-1/2 px-5 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Keyword
                    </label>
                    <textarea  onChange={(e) => handleTextarea("keywords", e.target.value)} value={user.keywords} name="keywords" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Keyword Here" />
                  </div>
                </div>

                <div className="w-1/2 px-5 ">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Description
                    </label>
                    <textarea  onChange={(e) => handleTextarea("description", e.target.value)} value={user.description} name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Description Here" />
                  </div>
                 
                </div>
                </div>
                
                
              
                <div className=" px-5 ">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      H1
                    </label>
                    <textarea  onChange={(e) => handleTextarea("h1", e.target.value)} value={user.h1} name="h1" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter H1 Here" />
                  </div>
                </div>

                <div className=" px-5 gridMakerLang ">
                  <label>
                    Check this box: {user.isCheckedImage}
                  <input type="checkbox"  checked={user.isCheckedImage} onChange={handleCheckboxChange} />
              </label>
              </div>

              <div className="flex flex-wrap">

                <div className="w-1/2 px-5 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Image Url
                    </label>
                    <textarea  onChange={(e) => handleTextarea("schemaImgUrl", e.target.value)} value={user.schemaImgUrl} name="schemaImgUrl" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Image url Here   2024/image.jpg" />
                  </div>
                </div>

                <div className=" px-5 w-1/2 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                       Image Alt
                    </label>
                    <textarea  onChange={(e) => handleTextarea("ImageAlt", e.target.value)} value={user.ImageAlt} name="ImageAlt" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Image Alt" />
                  </div>
                </div>
              </div>


                <div className="mb-4 px-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Content
                    <textarea  onChange={(e) => handleTextarea("content", e.target.value)} value={user.content} name="content" className="shadow form-textarea mt-1 block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={5} placeholder="<>div content here</>" />
                  </label>
                </div>





                <div className="mb-4 px-5 gridMakerLang ">
            <span>FAQ </span> 
            
            <label> Want
          <input type="checkbox"  checked={user.isCheckedFAQ} onChange={handleFAQChecked} />
        </label>
            <br/>
            <br/>
                <label className="px-2">
                      <input className="mr-2 leading-tight"
                      type="radio"
                      name="language"
                      value="अक्सर पूछे जाने वाले प्रश्न"
                      checked={user.selectedLanguage === 'अक्सर पूछे जाने वाले प्रश्न'}
                      onChange={handleRadioChange}  
                      />
                      <span className="text-sm">
                      Hindi
                      </span>
                    </label>


                <label className="px-2">
                      <input className="mr-2 leading-tight"
                      type="radio"
                      name="language"
                      value="Frequently Asked Questions:"
                      checked={user.selectedLanguage === 'Frequently Asked Questions:'}
                      onChange={handleRadioChange}
                      />
                      <span className="text-sm">
                      English
                      </span>
                    </label>
                    </div>



                <div className="mb-4 px-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Frequently Asked Question
                    <textarea  onChange={(e) => handleTextarea("FaqBt", e.target.value)} value={user.FaqBt} name="FaqBt" className="shadow form-textarea mt-1 block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={5} placeholder="/q+ =Question    /a+ =Answer" />
                  </label>
                </div>

            </div>

              <div className="w-4/12 " >

                <div>
                  <h3>Choose Year</h3>


                  <div className=" px-5 gridMakerLang ">
                  <label>
                    2023:
        <input
          type="radio"
          name="year"
          value="2023"
          checked={user.whichYear === '2023'}
          onChange={() => handleYearChange('2023')}
          />
      </label>
      
      <label>
        2024:
        <input
          type="radio"
          name="year"
          value="2024"
          checked={user.whichYear === '2024'}
          onChange={() => handleYearChange('2024')}
          />
      </label>
              </div>


                  </div>

                <div>
                  <h3>Choose Language</h3>

                  
                  <div className="mb-4 gridMakerLang py-3 grid grid1fr gap-3 ">

                        {
                         LangAuthor.map((items , index)=>{
                          return(
                              <>
                    <label className="px-2">
                      <input className="mr-2 leading-tight"
                       type="checkbox"
                       name={items.TempName}
                       checked={user.checkedOptions.some((option) => `${items.TempSearchName}` in option)}
                       onChange={(e) => handleCheckbox(`${items.TempName}`, e.target.checked)}
                      />
                      <span className="text-sm">
                        {items.FaceName}
                      </span>
                    </label>

                              </>
                          )
                         })   

                        }



                  </div>
              
                  <hr />
                  <div className="flex justify-center py-3"><span> Direct By Author</span></div>
                  


                  <div className="mb-4 gridMakerLang py-3 grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {
                         AuthorMains.map((items , index)=>{
                          return(
                              <>
                    <label className="px-2">
                      <input className="mr-2 leading-tight"
                       type="checkbox"
                       name={items.TempName}
                       checked={user.checkedOptions.some((option) => `${items.TempSearchName}` in option)}
                       onChange={(e) => handleCheckbox(`${items.TempName}`, e.target.checked)}
                      />
                      <span className="text-sm">
                        {items.FaceName}
                      </span>
                    </label>

                              </>
                          )
                         })   

                        }


                  </div>

               



                </div>
              </div>
         


            <div className="flex px-3 items-center  w-[100%] my-10 justify-center">
              <input className="      bg-blue-500 hover:cursor-pointer w-[40%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={PostData} value="submit"/>
            </div>
                
            </div>

            
          </form>
              </div>
      </section>

    </>
  );
};
