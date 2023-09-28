'use client'
import { LangAuthor   , AuthorMains} from "@/components/proMap";
import React, { useState } from "react";
import WrapH2WithDiv from '@/components/text-convertor';

export const Form = () => {
  const [user, setuser] = useState({
    title: "",
    keywords: "",
    description: "",
    url: "",
    h1: "",
    schemaImgUrl: "",
    content: "" , 
    checkedOptions: [], 
  });


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
    const { title, keywords, description, url, h1, schemaImgUrl, content, checkedOptions , ftr } = user;




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
        checkedOptions , ftr
      }),
    });
    
    const ResData = await res.json();
    console.log(ResData.status);
    
   
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

                <div className=" px-5 ">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Schema Image Url
                    </label>
                    <textarea  onChange={(e) => handleTextarea("schemaImgUrl", e.target.value)} value={user.schemaImgUrl} name="schemaImgUrl" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter schema Image url Here" />
                  </div>
                </div>


                <div className="mb-4 px-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Content
                    <textarea  onChange={(e) => handleTextarea("content", e.target.value)} value={user.content} name="content" className="shadow form-textarea mt-1 block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={5} placeholder="<>div content here</>" />
                  </label>
                </div>

            </div>

              <div className="w-4/12 " >
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
              <input className="bg-blue-500 w-[40%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={PostData} value="submit"/>
            </div>
                
            </div>

            
          </form>
              </div>
      </section>

    </>
  );
};
