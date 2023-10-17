// userrSlice.js

import { createSlice } from '@reduxjs/toolkit';


const  initialState = {
 IdsToDownloadDataByCheck:[]
};
const oneWayStateSlice = createSlice({
  name: 'OneWayState',
  initialState,
  reducers: {
    UpdateOneWayState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { UpdateOneWayState} = oneWayStateSlice.actions;
export default oneWayStateSlice.reducer;
