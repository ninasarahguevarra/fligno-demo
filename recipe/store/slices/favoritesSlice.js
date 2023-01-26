import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useAddToFavorites, useRemoveFromFavorites, useFavoritesList } from "hooks/favorites/useFavorites";

export const postAddToFavorites = createAsyncThunk("favorites/postFavorites", async (payload, thunkAPI) => {
    const response = await useAddToFavorites(payload);
    return response;
});

export const postRemoveFromFavorites = createAsyncThunk("favorites/postRemoveFromFavorites", async (payload, thunkAPI) => {
    const response = await useRemoveFromFavorites(payload);
    return response;
});

export const getFavorites = createAsyncThunk("favorites/getFavorites", async (payload, thunkAPI) => {
    const response = await useFavoritesList(payload);
    return response;
});

const initialState = {
    addedfavoritesResponse: {},
    removedfavoritesResponse: {},
    favorites: {},
    isLoading: false,

};

export const FavoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(HYDRATE, (state, action) => {
                // HYDRATE is for server side rendering

                // for client side state override
                const favoritesPayload = action.payload.favorites;
                if (!favoritesPayload) {
                    return state;
                }
                state.addedfavoritesResponse = favoritesPayload.addedfavoritesResponse;
                state.removedfavoritesResponse = favoritesPayload.removedfavoritesResponse;
                state.favorites = favoritesPayload.favorites;
            })

            .addCase(postAddToFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postAddToFavorites.fulfilled, (state, action) => {
                state.addedfavoritesResponse = action.payload;
                state.isLoading = false;
            })
            .addCase(postAddToFavorites.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(postRemoveFromFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postRemoveFromFavorites.fulfilled, (state, action) => {
                state.removedfavoritesResponse = action.payload;
                state.isLoading = false;
            })
            .addCase(postRemoveFromFavorites.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                state.isLoading = false;
            })
            .addCase(getFavorites.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

// ACTIONS
export const { } = FavoritesSlice.actions;

// STATES
export const selectFavorites = (state) => state.favorites;

export default FavoritesSlice.reducer;
