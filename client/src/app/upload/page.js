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
    console.log(clear)
    console.log(data.title)



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

        // Extract data using regular expressions
        const titleMatch = htmlContent.match(/<strong>Title:<\/strong>\s*([^<]+)/i);
        const keywordsMatch = htmlContent.match(/<strong>Keywords:<\/strong>\s*([^<]+)/i);
        const urlMatch = htmlContent.match(/<strong>URL:<\/strong>\s*<a\s+[^>]*href="([^"]+)"/i);
        const altMatch = htmlContent.match(/<strong>Alt:<\/strong>\s*([^<]+)/i);
        const desMatch = htmlContent.match(/<strong>Description:<\/strong>\s*([^<]+)/i);
        const desMatcht = htmlContent.match(/<strong>Des:<\/strong>\s*([^<]+)/i);
        const h1Match = htmlContent.match(/<strong>H1:<\/strong>\s*([^<]+)/i);
        const AltMatch = htmlContent.match(/<strong>Alt:<\/strong>\s*([^<]+)/i);

        if (titleMatch) {
            dataObject.title = titleMatch[1].trim();
        }

        if (AltMatch) {
            dataObject.Alt = AltMatch[1].trim();
        }



        if (keywordsMatch) {
            dataObject.keywords = keywordsMatch[1].trim();
        }

        if (urlMatch) {
            let dataObjectnew = urlMatch[1].trim();
            let an = extractFileNamesFromUrls(dataObjectnew)
            dataObject.URL = an
        }
        if (desMatcht) {
            dataObject.Des = desMatcht[1].trim();

        }

        if (altMatch) {
            dataObject.Alt = altMatch[1].trim();
        }

        if (desMatch) {
            dataObject.Des = desMatch[1].trim();
        }

        if (h1Match) {
            dataObject.H1 = h1Match[1].trim();
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
        const contentToRemove = ['Written By:', 'Translated By:', 'Title:', 'URL:', 'Alt:', 'Des:', 'H1:', 'Image:', 'image:',];

        contentToRemove.forEach((content) => {
            $(`p:contains('${content}')`).remove();
        });

        $('body *').removeAttr('id');
        const modifiedHtmlContent = $("body").html();

        setclear(modifiedHtmlContent)
        setData(extractedData);

        console.log(clear)

        dispatch(updateuserr({
            title: data.title,
            keywords: data.keywords,
            description: data.Des,
            url: data.URL,
            h1: data.H1,
            ImageAlt: data.Alt
        }));

    }



    useEffect(() => {
        dispatch(updateuserr({ content: clear }));
    }, [clear, data])

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
                <button
        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:bg-green-800"
        onClick={handleButtonClick} 
        disabled={!fileLoaded} // Disable the button if fileLoaded is false
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