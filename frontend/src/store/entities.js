import { combineReducers } from "redux";
import { postsReducer } from "./posts";
import { searchReducer } from "./search"
import { commentsReducer } from "./comments";

const entitiesReducer = combineReducers({
    posts: postsReducer,
    search: searchReducer,
    comments: commentsReducer
})

export default entitiesReducer
