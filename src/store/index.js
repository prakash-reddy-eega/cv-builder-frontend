import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import layoutReducer from './LayoutStyle'
import locaCvDataReducer from './localCvData'



const store = configureStore({
  reducer: {auth: authReducer,  layoutStyle: layoutReducer, localCv: locaCvDataReducer}
});

export default store;