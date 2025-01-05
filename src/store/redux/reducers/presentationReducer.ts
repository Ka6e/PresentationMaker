import { UnknownAction } from "redux";
import { renamePresentationTitle } from "../../renamePresentationTitle";
import { PresentationActionType} from "../actions/presentationActions";
import { EditorType } from "../../EditorType";
import { SelectionType } from "../../EditorType"
import { setSelection } from "../../setSelection";


const presentationReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case PresentationActionType.SET_SELECTION: {
            return setSelection(state, action.payload as SelectionType);
        }
        case PresentationActionType.RENAME_PRESENTATION: {
            return renamePresentationTitle(state, action.payload as string);
        }
        default:
            return state;
    }
}

export {
    presentationReducer,
}