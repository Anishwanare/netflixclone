import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: localStorage.getItem('userName') || null, // Note the key is 'userName'
        token: localStorage.getItem('userToken') || null,
    },
    reducers: {
        login: (state, action) => {
            state.userName = action.payload.userName;
            state.token = action.payload.token;
            localStorage.setItem('userName', action.payload.userName); // Store userName with the correct key
            localStorage.setItem('userToken', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.userName = null;
            localStorage.removeItem('userToken');
            localStorage.removeItem('userName'); // Remove userName from localStorage
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
