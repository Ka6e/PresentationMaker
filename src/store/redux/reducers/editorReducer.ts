import { UnknownAction } from "redux";
import { EditorType } from "../../functions/EditorType";
import { EditorActions } from "../actions/editorActions";
import { updateEditor } from "../../functions/updateEditor";
import { HistoryManeger } from "../../storage/store";

const editorReducer = (state: HistoryManeger, action: UnknownAction): HistoryManeger => {
    switch(action.type){

        case EditorActions.SET_IS_CHANGING: {
            return {past: state.past, current: state.current, future: state.future, isChanging: action.payload as boolean};
        }
        case EditorActions.IMPORT: {
            return updateEditor(state,action.payload as EditorType);
        }
        case EditorActions.UNDO: {
            if(state.past.length === 0){
                return state;
            }
            const previousEditor = state.past[state.past.length - 1];
            const updatedPast = state.past.slice(0, -1);
            const updatedFuture = [state.current, ...state.future];

            return {
                past: updatedPast,
                current: previousEditor,
                future: updatedFuture,
                isChanging: false,
            }
        }
        case EditorActions.REDO: {
            if (state.future.length === 0) {
                return state; 
            }
              
            const nextState = state.future[0];  
            const updatedPast = [...state.past, state.current]; 
            const updatedFuture = state.future.slice(1);  
              
            return {
              past: updatedPast,
              current: nextState,
              future: updatedFuture,
              isChanging: false,
            };
        }
        default:
            return state;
    }
}

export {
    editorReducer,
}