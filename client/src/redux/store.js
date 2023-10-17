// store.js

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import  dateFinderSlice from  "./slice/getDateSlice"
import  oneWayStateSlice  from  "./slice/onewaystateSlice"

const store = configureStore({
    reducer: {
        userr: userSlice,
        dateFinder:dateFinderSlice,
        OneWayState:oneWayStateSlice,
    },
});

export default store;
