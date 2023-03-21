import { combineReducers } from "redux";
import { postErrorsReducer } from "./posts";
import { sessionErrorsReducer } from "./session";
import { searchErrorsReducer } from "./search";

export default combineReducers({
    session: sessionErrorsReducer,
    posts: postErrorsReducer,
    search: searchErrorsReducer
})