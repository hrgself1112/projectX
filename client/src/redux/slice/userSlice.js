// userrSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userr',
  initialState: {
    title: "",
    keywords: "",
    description: "",
    url: "",
    h1: "",
    schemaImgUrl: "",
    content: "<p>checkingthis data </p>",
    FaqBt: "",
    ImageAlt: "",
    year: "",
    checkedOptions: [],
    selectedLanguage: "",
    isCheckedImage: false, // Initialize to false
    isCheckedFAQ: false, // Initialize to false
    whichYear: "",
    editorData:"" ,
    formattedHTML:""
  },
  reducers: {
    updateuserr: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateuserr } = userSlice.actions;
export default userSlice.reducer;
