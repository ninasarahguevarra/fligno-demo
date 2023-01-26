import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { usePersonalToken, useRegistration } from "hooks/authentication/useAuthentication";

export const postAuthentication = createAsyncThunk("auth/postAuthentication", async (payload, thunkAPI) => {
    const response = await usePersonalToken(payload);
    return response;
});
export const postRegistration = createAsyncThunk("auth/postRegistration", async (payload, thunkAPI) => {
    const response = await useRegistration(payload);
    return response;
});

const initialState = {
    personal_token: {},
    loginResponse: {},
    registrationResponse: {},
    isLoading: false,

};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setPersonalToken: (state, action) => {
            state.personal_token = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(HYDRATE, (state, action) => {
                // HYDRATE is for server side rendering

                // for client side state override
                const authPayload = action.payload.auth;
                if (!authPayload) {
                    return state;
                }
                state.loginResponse = authPayload.loginResponse;
            })

            .addCase(postAuthentication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postAuthentication.fulfilled, (state, action) => {
                state.loginResponse = action.payload;
                state.isLoading = false;
            })
            .addCase(postAuthentication.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(postRegistration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postRegistration.fulfilled, (state, action) => {
                state.registrationResponse = action.payload;
                state.isLoading = false;
            })
            .addCase(postRegistration.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

// ACTIONS
export const { setPersonalToken } = AuthSlice.actions;

// STATES
export const selectAuth = (state) => state.auth;

export default AuthSlice.reducer;
