import { createSlice } from '@reduxjs/toolkit';
import { TOKEN } from '../utils/constants';

const jwtToken = localStorage.getItem(TOKEN)
const parsed = JSON.parse(jwtToken)

const token = localStorage.getItem(TOKEN)

const initialAuthState = {
  isAuthenticated: false,
};

if(token){
  initialAuthState.isAuthenticated = true
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;