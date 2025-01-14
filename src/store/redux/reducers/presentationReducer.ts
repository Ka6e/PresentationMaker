import { UnknownAction } from "redux";
import { PresentationActionType} from "../actions/presentationActions";
import { EditorType } from "../../functions/EditorType";
import { SelectionType } from "../../functions/EditorType"
import { setSelection } from "../../functions/setSelection";


const presentationReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case PresentationActionType.SET_SELECTION: {
            return setSelection(state, action.payload as SelectionType);
        }
        case PresentationActionType.RENAME_PRESENTATION: {
            const newTitle = typeof action.payload === 'string' ? action.payload.trim() : '';
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    title: newTitle ? newTitle : 'Новая презентация', 
                },
            }
        }
        default:
            return state;
    }
}

export {
    presentationReducer,
}