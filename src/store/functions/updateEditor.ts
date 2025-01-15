import { HistoryManeger } from "../storage/store";
import { EditorType } from "./EditorType";

function updateEditor(state: HistoryManeger, newEditor: EditorType): HistoryManeger{
    return {
        past:[...state.past, state.current],
        current: newEditor,
        future:[],
    };
}

export {updateEditor}