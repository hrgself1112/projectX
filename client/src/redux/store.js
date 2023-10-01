// store.js

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';

const store = configureStore({
    reducer: {
        userr: userSlice,
    },
});

export default store;
