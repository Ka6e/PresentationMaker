import { UnknownAction } from "redux";
import { exportToFile, importEditor } from "../../localeStorage/jsonUtils";
// import { importFromFile } from "../../localeStorage/jsonUtils";
import { EditorType } from "../../EditorType";
import { EditorActions } from "../actions/editorActions";
// import { PresentationType } from "../../PresentationType";

const editorReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case EditorActions.EXPORT: {
            exportToFile(state);
            return state;
        }
        case EditorActions.IMPORT: {
            return importEditor(state, action.payload as string);
        }
        default:
            return state;
    }
}

export {
    editorReducer,
}