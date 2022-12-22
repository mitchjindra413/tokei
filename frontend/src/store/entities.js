import { combineReducers } from "redux";
import { postsReducer } from "./posts";

export const entitiesReducer = combineReducers({
    posts: postsReducer
})