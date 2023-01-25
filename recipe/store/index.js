import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper'

import list from "./slices/recipeListSlice";
import auth from "./slices/authSlice";
import favorites from "./slices/favoritesSlice";

const rootReducer = combineReducers({
    list,
    auth,
    favorites
});

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
});

export const wrapper = createWrapper(makeStore, { debug: true });