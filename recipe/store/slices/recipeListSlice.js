import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useRecipeList, useRecipeDetails } from "hooks/recipeList/useRecipeList";

export const getRecipeList = createAsyncThunk("dashboard/getRecipeList", async (payload, thunkAPI) => {
    const response = await useRecipeList(payload);
    return response;
});
export const getRecipeDetails = createAsyncThunk("dashboard/getRecipeDetails", async (payload, thunkAPI) => {
    const response = await useRecipeDetails(payload);
    return response;
});

const initialState = {
    recipeList: {},
    recipeDetails: {},
    isLoading: false,
};

export const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setRecipeList: (state, action) => {
            state.recipeList = action.payload;
        },
        setRecipeDetails: (state, action) => {
            state.recipeDetails = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(HYDRATE, (state, action) => {
                // HYDRATE is for server side rendering

                // for client side state override
                const RecipeListPayload = action.payload.list;
                if (!RecipeListPayload) {
                    return state;
                }
                state.recipeList = RecipeListPayload.account;
            })

            .addCase(getRecipeList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecipeList.fulfilled,(state, action) => {
                state.recipeList = action.payload;
                state.isLoading = false;
            })
            .addCase(getRecipeList.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getRecipeDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecipeDetails.fulfilled,(state, action) => {
                state.recipeDetails = action.payload;
                state.isLoading = false;
            })
            .addCase(getRecipeDetails.rejected, (state) => {
                state.isLoading = false;
            })

    },
});

// ACTIONS
export const { setRecipeList, setRecipeDetails } = DashboardSlice.actions;

// STATES
export const selectRecipeList = (state) => state.list;

export default DashboardSlice.reducer;