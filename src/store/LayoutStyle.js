import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT } from '../utils/constants';

const initialLayoutState = {
  layoutStyle: DEFAULT, isOpen: false
};


const layoutSlice = createSlice({
  name: 'layoutStyle',
  initialState: initialLayoutState,
  reducers: {
    onStyleChange(state, action) {
      state.layoutStyle = action.payload;
    },
    close(state){
        state.isOpen = false
    },
    open(state){
        state.isOpen = true
    }
  },
});

export const layoutStyleActions = layoutSlice.actions;

export default layoutSlice.reducer;