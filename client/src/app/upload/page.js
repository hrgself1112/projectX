"use client"
import mammoth from "mammoth";
import React, { useState, useEffect } from "react";
const cheerio = require('cheerio');
import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userr);

    const [loading, setLoading] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false);
    const [btndisabled, setbtndisabled] = useState(true);

    
          // Helper function to remove HTML tags and handle special characters
          function cleanTextNewwer(text) {
            return text.replace(/&nbsp;/g, '').trim();
        }
    const { title,
        keywords
        , description
        , url
        , h1
        , schemaImgUrl
        , content
        , FaqBt
        , ImageAlt
        , year
        , checkedOptions
        , selectedLanguage
        , isCheckedImage
        , isCheckedFAQ
        , whichYear,
        formattedHTML,
        editorData
    } = user;

    const [renderedDoc, setRenderedDoc] = useState();
    const [clear, setclear] = useState();


    const [data, setData] = useState({
        title: "",
        keywords: "",
        URL: "",
        Alt: "",
        Des: "",
        H1: "",
        Alt: "",
    });

    // {}
    // console.log(clear)
    // console.log(data.url)



    const itsh1 = /<(.*?)>[^>]*<\/\1>|<.*?\/>/g;

    function getFirstChild(string) {
        let output = itsh1.exec(string);
        console.log("getFirstChild", output);
    }


    function parseWordDocxFile(inputElement) {
        var files = inputElement.files || [];
        if (!files.length) return;

        setLoading(true);

        var file = files[0]; // solo el 1er archivo

        console.time();
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;
            mammoth
                .convertToHtml({ arrayBuffer: arrayBuffer })
                .then(function (resultObject) {
                    let rendered = resultObject.value;
                    console.log(rendered);
                    setRenderedDoc(rendered);
                    getFirstChild(rendered);
                    setFileLoaded(true);
                })
                .finally(() => {
                    setLoading(false);
                    console.timeEnd();
                });

            mammoth
                .extractRawText({ arrayBuffer: arrayBuffer })
                .then(function (resultObject) {
                    // result2.innerHTML = resultObject.value
                    // console.log(resultObject.value);
                });

            mammoth
                .convertToMarkdown({ arrayBuffer: arrayBuffer })
                .then(function (resultObject) {
                    // result3.innerHTML = resultObject.value
                    // console.log(resultObject.value);
                });
        };
        reader.readAsArrayBuffer(file);
    }



    function extractData(htmlContent) {
        // Initialize data object with default values
        const dataObject = {
            title: "",
            keywords: "",
            URL: "",
            Alt: "",
            Des: "",
            H1: "",
        };


          // Helper function to remove HTML tags and handle special characters
    function cleanText(text) {
        return text.replace(/<\/?strong>/g, '').replace(/&nbsp;/g, '').trim();
    }
        // Extract data using regular expressions
        // const titleMatch = htmlContent.match(/<strong>Title:<\/strong>\s*([^<]+)/i);
        
        const titleMatch = htmlContent.match(/(?:<strong>|<\/strong>)?Title(?:<\/strong>|<\/strong>)?(?::|<strong>:<\/strong>|:)\s*([^<]+)/i);
        const urlMatch = htmlContent.match(/(?:<strong>)?URL(?:<\/strong>)?(?::|<strong>:<\/strong>|:)\s*<a\s+[^>]*href="([^"]+)"/i);
        const keywordsMatch = htmlContent.match(/(?:<strong>)?Keywords(?:<\/strong>)?(?::|<strong>:<\/strong>|:)((?:\s*<strong>)?.*?(?:<\/strong>)*),/i);
        const desMatch = htmlContent.match(/(?:<strong>)?Description(?:<\/strong>)?(?::|<strong>:<\/strong>|:)((?:\s*<strong>)?.*?(?:<\/strong>)*),/i);
        const h1Match = htmlContent.match(/(?:<strong>)?H1(?:<\/strong>)?(?::|<strong>:<\/strong>|:)\s*([^<]+)/i);
        const altMatch = htmlContent.match(/(?:<strong>)?Alt(?:<\/strong>)?(?::|<strong>:<\/strong>|:)\s*([^<]+)/i);
        const desMatcht = htmlContent.match(/(?:<strong>)?Des(?:<\/strong>)?(?::|<strong>:<\/strong>|:)\s*([^<]+)/i);
        const AltMatch = htmlContent.match(/(?:<strong>)?Alt(?:<\/strong>)?(?::|<strong>:<\/strong>|:)\s*([^<]+)/i);
                

        const onetitleMatch = htmlContent.match(/Title:\s*([^<]+)/i);
        const onekeywordsMatch = htmlContent.match(/Keywords:\s*([^<]+)/i);
        const oneurlMatch = htmlContent.match(/URL:\s*<a\s+[^>]*href="([^"]+)"/i);
        const oneurlMatchN = htmlContent.match(/URL: \s*<a\s+[^>]*href="([^"]+)"/i);
        const onealtMatch = htmlContent.match(/Alt:\s*([^<]+)/i);
        const onedesMatch = htmlContent.match(/Description:\s*([^<]+)/i);
        const onedesMatcht = htmlContent.match(/Des:\s*([^<]+)/i);
        const oneh1Match = htmlContent.match(/H1:\s*([^<]+)/i);
        const oneAltMatch = htmlContent.match(/Alt:\s*([^<]+)/i);
        


        if (titleMatch) {
            dataObject.title = cleanText(titleMatch[1])
        }
        if (onetitleMatch) {
            dataObject.title = cleanText(onetitleMatch[1])
        }

        if (AltMatch) {
            dataObject.Alt = cleanText(AltMatch[1])
        }
        if (oneAltMatch) {
            dataObject.Alt = cleanText(oneAltMatch[1])
        }
        if (oneurlMatchN) {
            let dataObjectnew = cleanText(oneurlMatchN[1])      
            console.log(dataObjectnew)     
            let an = extractFileNamesFromUrls(dataObjectnew)
            console.log(an)
            dataObject.URL = an
        }


        if (keywordsMatch) {
            const keywords = cleanText(keywordsMatch[1])
            dataObject.keywords = keywords.replace(/<\/?strong>/g, ''); // Remove <strong> tags
        }
        
        if (onekeywordsMatch) {
            dataObject.keywords = cleanText(onekeywordsMatch[1])
        }

        if (urlMatch) {
            let dataObjectnew = cleanText(urlMatch[1])         
            console.log(dataObjectnew)  
            let an = extractFileNamesFromUrls(dataObjectnew)
            console.log(an)
            dataObject.URL = an
        }
        if (oneurlMatch) {
            let dataObjectnew = cleanText(oneurlMatch[1])     
            console.log(dataObjectnew)      
            let an = extractFileNamesFromUrls(dataObjectnew)
            console.log(an)
            dataObject.URL = an
        }
        

        
        if (desMatcht) {
            const keywords = cleanText(desMatch[1])
            dataObject.Des = keywords.replace(/<\/?strong>/g, ''); // Remove <strong> tags
        }
        if (onedesMatcht) {
            dataObject.Des = cleanText(onedesMatcht[1])
    }
   
   
        if (altMatch) {
            dataObject.Alt = cleanText(altMatch[1])
        }
        if (onealtMatch) {
            dataObject.Alt = cleanText(onealtMatch[1])
        }

        if (desMatch) {
            const keywords = cleanText(desMatch[1])
            dataObject.Des = keywords.replace(/<\/?strong>/g, ''); // Remove <strong> tags
        }
        if (onedesMatch) {
            dataObject.Des = cleanText(onedesMatch[1])
        }

        if (h1Match) {
            dataObject.H1 = cleanText(h1Match[1])
        }
        if (oneh1Match) {
            dataObject.H1 = cleanText(oneh1Match[1])
        }

        return dataObject;
    }

  
    function extractFileNamesFromUrls(urls) {
        const parts = urls.split("/");
        return parts[parts.length - 1];
    }      

    function handleButtonClick() {

        const extractedData = extractData(renderedDoc);
        console.log(extractedData)

        const htmlContent = renderedDoc

        const $ = cheerio.load(htmlContent);

        // Define a list of content to remove based on their content
        const contentToRemove = ['Written By:', 'Translated By:', 'Title:', 'URL:', 'Alt:', 'Des:', 'Description:','Keywords:','H1:', 'Image:', 'image:',];

        contentToRemove.forEach((content) => {
            $(`p:contains('${content}')`).remove();
        });

        $('body *').removeAttr('id');
        const modifiedHtmlContent = $("body").html();

        setclear(modifiedHtmlContent)
        setData(extractedData);


        dispatch(updateuserr({
            title: data.title,
            keywords: data.keywords,
            description: data.Des,
            url: data.URL,
            h1: data.H1,
            ImageAlt: data.Alt
        }));

    }

function SetContent(){
    if(content == ""){
        alert("enter something in content box")
    }
    else{
        setRenderedDoc(cleanTextNewwer(content))
        console.log(content)
        setFileLoaded(true);
        console.log(renderedDoc)
    }
}
    

    useEffect(() => {
        dispatch(updateuserr({ content: clear }));

    }, [clear, data ])

    return (
        <>

            <div className="flex">
                <label class="block mr-10">
                    <span class="sr-only"></span>
                    <input type="file" class="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white cursor-pointer
      hover:file:bg-blue-600
    " onChange={(e) => parseWordDocxFile(e.target)}
                    />
                </label>

                <div className="mx-5">
                <button onClick={SetContent}
className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-400 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ">Set Content</button>
                </div>
                <button
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:bg-green-800"
                    onClick={handleButtonClick}
                    disabled={!fileLoaded }
                     // Disable the button if fileLoaded is false
                >
                    {loading ? <>
                        <span class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                        Uploading  </>
                        : 'Extract Data'}
                </button>

            </div>

        </>
    );
}

export default Page