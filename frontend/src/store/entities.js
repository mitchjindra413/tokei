import { combineReducers } from "redux";
import { postsReducer } from "./posts";
import { searchReducer } from "./search"

const entitiesReducer = combineReducers({
    posts: postsReducer,
    search: searchReducer
})

export default entitiesReducer
