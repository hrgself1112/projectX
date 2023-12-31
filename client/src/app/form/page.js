'use client'

import React, { useState, useEffect } from "react";
import { updateuserr, resetUser } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import FormInputs from "./formInputs";
import ProfileRadioButton from "./profileRadioButton";
import axios from "axios";


const beautify = require('js-beautify').html;

export const Form = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userr);

  const [isSubmitting, setIsSubmitting] = useState(false);



  function addSpaceToStrongTags(htmlString) {
    // Use a regular expression to match and modify <strong> tags
    return htmlString.replace(/<strong>(.*?)<\/strong>/g, '<strong> $1 </strong>');
  }

  const processFormattedHTML = (html) => {
    const withoutNbspParagraphs = html.replace(/<p>(&nbsp;|\s*)<\/p>/g, '');
    const withoutSpaceParagraphstwo = withoutNbspParagraphs.replace(/<p>\s*<\/p>/g, '');
    const withoutSpaceParagraphs = addSpaceToStrongTags(withoutSpaceParagraphstwo)
    console.log(withoutSpaceParagraphs)
    return withoutSpaceParagraphs;
  };




  useEffect(() => {
    try {
      const formatted = beautify(user.editorData, {
        indent_size: 2,
      });

      const processedHTML = processFormattedHTML(formatted);
      console.log(processedHTML)
      dispatch(updateuserr({ ...user, content: processedHTML }));



    } catch (error) {
      f
      console.error('Error formatting HTML:', error);
      dispatch(updateuserr({ ...user, formattedHTML: user.editorData }));
    }


  }, [user.editorData]);






  const handleYearChange = (year) => {
    dispatch(updateuserr(({ ...user, whichYear: year, })));
  };




  const PostData = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }


    setIsSubmitting(true)

    if (user.tempSid) {
      try {
        const response = await axios.patch(`http://localhost:8080/register/${user.tempSid}`, user, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log('Form Data saved successfully');
          handleResetUser();
        } else {
          console.error('Error saving data');
        }

        setIsSubmitting(false);
      } catch (error) {
        console.error('An error occurred:', error);
      }

    }
    else {

      try {
        const response = await axios.post("http://localhost:8080/register", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log('Form Data saved successfully');
          handleResetUser();
        } else {
          console.error('Error saving data');
        }

      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    setIsSubmitting(false);

  }


  function handleResetUser() {
    dispatch(resetUser());
  }


  useEffect(() => {

    const htmlContent = `${user.content}`;

    const sections = htmlContent.split('<h2>');

    const filteredSections = sections.filter(section => section.trim().length > 0);


    const withDivs = user.isCheckedImage
      ? filteredSections.map((section, index) => {
        if (index === 0) {
          return `\n<div class="card-view-content">${section.split('<p>').map((p, pIndex) => {
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
        return element.replace('<div class="card-view-content"><h2>', '\t<div class="card-view-content">');
      }
      else if (!index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '\t<div class="card-view-content">\n<h2>');
      }
      return element;
    });


    const modifiedRealContentAMP = withDivsAMP.map((element, index) => {
      if (index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '\t<div class="card-view-content">\n');
      }
      else if (!index === 0) {
        return element.replace('<div class="card-view-content"><h2>', '\t<div class="card-view-content">\jhriritk<h2>');
      }
      return element;
    });




    let grt;
    modifiedRealContentAMP.forEach((element, index) => {
      if (index === modifiedRealContentAMP.length - 1) {
        grt = element.split("</div>").join(`${user.lastFaqText} </div>`)
      }
    });




    modifiedRealContentAMP[modifiedRealContentAMP.length - 1] = grt;



    let modifyffnormal = modifiedRealContent.join('')
    let modifyffamp = modifiedRealContentAMP.join('')


    dispatch(updateuserr({ ...user, finalHtmlContent: modifyffnormal, finalHtmlContentAMP: modifyffamp, }));

  }, [isSubmitting, user.content])


  return (

    <>


      <section className="p-5">
        <div className="container">
          <form onSubmit={PostData}>



            <div className="flex flex-wrap">
              <div className="w-8/12">

                <FormInputs />

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
                          />x
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

                <ProfileRadioButton />
              </div>


              <div className="flex px-3 items-center  w-[100%] my-10 justify-center">
                <button className="bg-blue-500 hover:cursor-pointer w-[40%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="submit" >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

    </>
  );
};
