// userrSlice.js

import { createSlice } from '@reduxjs/toolkit';


const  initialState = {
 startdateFinder:"" ,
 enddateFinder:"" , 
};
const dateFinderSlice = createSlice({
  name: 'dateFinder',
  initialState,
  reducers: {
    UpdateDateandTime: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { UpdateDateandTime} = dateFinderSlice.actions;
export default dateFinderSlice.reducer;
