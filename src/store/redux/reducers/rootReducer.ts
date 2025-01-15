import {  UnknownAction } from "redux";
import { slideReducer } from "./slideReducer";
import { presentationReducer } from "./presentationReducer";
import { editorReducer } from "./editorReducer";
import { elementReducer } from "./elementReducer";
// import { initialState } from "../../localeStorage/store";
import { editor } from "../../functions/data";
import { saveToLocaleStorage } from "../../storage/localeStorage";
import { HistoryManeger } from "../../storage/store";
import { EditorActions } from "../actions/editorActions";

const rootReducer = (state: HistoryManeger = {past: [], current: editor, future: [], isChanging: false} ,action: UnknownAction): HistoryManeger => {
    let newState = {...state};
    newState.current = presentationReducer(newState.current, action);
    newState.current = slideReducer(newState.current, action);
    newState.current = elementReducer(newState.current, action);
    newState = editorReducer(newState, action);

    if(
        state.isChanging !== action.payload &&
        state.isChanging === false &&
        action.type !== EditorActions.UNDO && 
        action.type !== EditorActions.REDO &&
        action.type !== EditorActions.SET_EDITOR
    ){
        newState.past = [...newState.past, state.current];
        newState.future = [];
        saveToLocaleStorage(newState.current);
    }


    return newState;
}

export {
    rootReducer
}