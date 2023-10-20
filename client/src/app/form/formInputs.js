'use client'
import React from 'react'
import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import CkEditorProjectX from '@/components/ckEditor/ckEditorProjectX';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const FormInputs = () => {


  const dispatch = useDispatch();

  const user = useSelector((state) => state.userr);


  const { FaqBt , lastFaqText } = user




  const handleCheckboxChange = (e) => {
    dispatch(updateuserr({ ...user, isCheckedImage: e.target.checked }));
  };



  const handleEditorChange = (newData) => {
    dispatch(updateuserr({ editorData: newData }));
  };


  const handleRadioChange = (event) => {
    dispatch(updateuserr({ ...user, selectedLanguage: event.target.value }));

  };

  const handleFAQChecked = (e) => {
    if(user.checkedOptions.length >= 1){
      dispatch(updateuserr({ ...user, isCheckedFAQ: e.target.checked }));
    }
    else{
      // alert("Please check and language to use FaQ")
      toast.error('Please Select a language or author');
    }

  };


  function mmn() {
    if (user.isCheckedFAQ) {
      setDataFaq()
    }
    else {
      dispatch(updateuserr({ ...user, NormalFaq: "", AMPfaq: "", }));

    }
  }



  const handleTextarea = (name, value) => {
    dispatch(updateuserr({ [name]: value }));
  };



  useEffect(() => {
    mmn()

    return () => {
      mmn()
    }
  }, [user.isCheckedFAQ])

  function setDataFaq() {

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

    const faqElementsAMP = FAQ.map((item, index) => {
      return (

        index == FAQ.length - 1 ? `{
              "@type": "Question",
              "name": "${item.question}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${item.answer}"
              }
            }` : `{
              "@type": "Question",
              "name": "${item.question}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${item.answer}"
              }
            },`
      )
    });

    const faqRealHtmlNormalAMP = `\t<script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [${faqElementsAMP.join('')}]
        }
   </script>
       `;


    const faqElements = FAQ.map((item, index) => (`\t\t<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
              <h3 itemprop="name">${item.question}</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                  <div itemprop="text">
                    <p>${item.answer}</p>
                  </div>
                </div>
             </div>
`
    ));


    const faqRealHtmlNormal = `\t<div class="card-view-content">
      <h2>${user.selectedLanguage != "" ? user.selectedLanguage : user.checkedOptions[0]['FaqLangH2']}</h2>
      <div itemscope itemtype="https://schema.org/FAQPage">
        ${faqElements.join('')}
        </div>
        ${lastFaqText}
        </div>  
    `;

    dispatch(updateuserr({ ...user, NormalFaq: faqRealHtmlNormal, AMPfaq: faqRealHtmlNormalAMP, }));
  }





  return (
    <>



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



      <div style={{
        padding: " 0px 1.2rem",
        marginBottom: "1.2rem"
      }}>
        <CkEditorProjectX data={user.content} onChange={handleEditorChange} />
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
          <textarea onChange={(e) => handleTextarea("FaqBt", e.target.value)} value={user.FaqBt} name="FaqBt" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " rows={5} placeholder="/q+ =Question    /a+ =Answer" />
        </label>
      </div>

      <div className="mb-4 px-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
Last FaqText
          <textarea onChange={(e) => handleTextarea("lastFaqText", e.target.value)} value={user.lastFaqText} name="lastFaqText" className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus-visible:ring-blue-500 light:bg-slate-900 " rows={5} placeholder="<p>enter last text of after faq</p>" />
        </label>



        <Toaster position="top-right" />        
      </div>



    </>
  )
}

export default FormInputs