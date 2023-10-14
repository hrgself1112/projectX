'use client'
import { AuthorByLangskeletons, AuthorByNameskeletons } from "@/components/skeletons/skeletons";

import useFetch from "@/components/hooks/fetchHook";
import { useEffect , useState } from 'react';


import { updateuserr } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileRadioButton = () => {
    

    
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userr);

  
  
  const { data: LangAuthorr, isLoading: LangAuthorrisLoading, error: LangAuthorrerror } = useFetch('http://localhost:8080/api/data/databylanguagename'); // Adjust the URL
  const { data: AuthorMains, isLoading: AuthorMainsisLoading, error: AuthorMainserror } = useFetch('http://localhost:8080/api/data/databyauthorname'); // Adjust the URL
  const { data: savedpages, isLoading: savedpagesisLoading, error: savedpageserror } = useFetch('http://localhost:8080/api/savedfiles'); // Adjust the URL
  const { data: ProfileData, isLoading: ProfileisLoadingData, error: ProfileerrorData } = useFetch('http://localhost:8080/api/data/authorprofiledata'); // Adjust the URL


  
  const [ProfileDataHook, setProfileDataHook] = useState("")

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





  useEffect(() => {
    if (!ProfileisLoadingData && !ProfileerrorData) {
        const yourData = ProfileData;
        setProfileDataHook(yourData)
    }
  }, [LangAuthorr, AuthorMains,  savedpages ]);


  return (
    <>
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
    
    </>
  )
}

export default ProfileRadioButton