import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userModel } from '../api/models/models';

interface AuthState {
    user: userModel | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userModel>) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;