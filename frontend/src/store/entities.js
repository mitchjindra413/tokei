import { combineReducers } from "redux";
import { postsReducer } from "./posts";

const entitiesReducer = combineReducers({
    posts: postsReducer
})

export default entitiesReducer
