import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import layoutReducer from './LayoutStyle'



const store = configureStore({
  reducer: {auth: authReducer,  layoutStyle: layoutReducer}
});

export default store;