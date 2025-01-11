import {  UnknownAction } from "redux";
import { slideReducer } from "./slideReducer";
import { presentationReducer } from "./presentationReducer";
import { editorReducer } from "./editorReducer";
import { elementReducer } from "./elementReducer";
// import { initialState } from "../../localeStorage/store";
import { editor } from "../../data";
import { EditorType } from "../../EditorType";
import { saveToLocaleStorage } from "../../localeStorage/localeStorage";

const rootReducer = (state: EditorType = editor ,action: UnknownAction): EditorType => {
    let newState = {...state};
    newState = presentationReducer(newState, action);
    newState = slideReducer(newState, action);
    newState = elementReducer(newState, action);
    newState = editorReducer(newState, action);

    saveToLocaleStorage(newState);
    return newState;
}

export {
    rootReducer
}