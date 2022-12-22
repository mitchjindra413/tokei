import { combineReducers } from "redux";
import { postErrorsReducer } from "./posts";
import { sessionErrorsReducer } from "./session";

export default combineReducers({
    session: sessionErrorsReducer,
    posts: postErrorsReducer
})