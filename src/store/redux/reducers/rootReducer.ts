import { combineReducers } from "redux";
import { slideReducer } from "./slideReducer";

const rootReducer = combineReducers({
    slides: slideReducer,
});
