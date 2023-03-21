import { combineReducers } from "redux";
import { postErrorsReducer } from "./posts";
import { sessionErrorsReducer } from "./session";
import { searchErrorsReducer } from "./search";
import { commentErrorsReducer } from "./comments";

export default combineReducers({
    session: sessionErrorsReducer,
    posts: postErrorsReducer,
    search: searchErrorsReducer,
    comments: commentErrorsReducer
})