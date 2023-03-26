import { createSlice } from '@reduxjs/toolkit';

const initialState = {localCvData: null};


const localCvDataSlice = createSlice({
  name: 'localCvData',
  initialState: initialState,
  reducers: {
    onLocalCvDataChange(state, action) {
      state.localCvData = action.payload;
    },
    onResetLocalCvData(state){
        state.localCvData =  initialState
    }
  },
});

export const localCvDataActions = localCvDataSlice.actions;

export default localCvDataSlice.reducer;