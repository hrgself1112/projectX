// userrSlice.js

import { createSlice } from '@reduxjs/toolkit';


const  initialState = {
  title: "",
  keywords: "",
  description: "",
  url: "",
  h1: "",
  schemaImgUrl: "",
  ImageAlt: "",
  isCheckedImage: false, // Initialize to false
  content: "",
  year: "",
  checkedOptions: [],
  selectedLanguage: "",
  FaqBt: "",
  isCheckedFAQ: false, // Initialize to false
  whichYear: "",
  editorData:"" ,
  formattedHTML:"" , 
  AMPfaq:"" , 
  NormalFaq:"" , 
  finalHtmlContent:"" , 
  finalHtmlContentAMP:"" 
};
const userSlice = createSlice({
  name: 'userr',
  initialState,
  reducers: {
    updateuserr: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: (state) => {
      return initialState; // Reset to the initial state
    },
  },
});

export const { updateuserr  , resetUser} = userSlice.actions;
export default userSlice.reducer;
