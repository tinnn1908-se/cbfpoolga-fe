import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, initialAuth } from "../../models";

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers: {
        saveUserInfor: (state, action: PayloadAction<IAuth>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.tokens = action.payload.tokens;
            state.user = action.payload.user;
        },
        signout: (state) => {
            state.isLoggedIn = false;
            state.tokens = { access_token: '', refresh_token: '' };
            state.user = null;
        }
    }
})
export const { saveUserInfor, signout } = authSlice.actions