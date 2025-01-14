import { EditorType } from "../../functions/EditorType"

enum EditorActions {
    IMPORT = 'IMPORT',
    SET_EDITOR = 'SET_EDITOR',
    UNDO = 'UNDO',
    REDO = 'REDO',
    SET_IS_CHANGING = 'SET_IS_CHANGING',
}

const setIsChangingAction = (isChanging: boolean) => {
    return {
        type: EditorActions.SET_IS_CHANGING,
        payload: isChanging,
    }
}
 
const importAction = (jsonString: EditorType) => {
    return {
        type: EditorActions.IMPORT,
        payload: jsonString,
    }
}

const setEditorAction = (newEditor: EditorType) => {
    return {
        type: EditorActions.SET_EDITOR,
        payload: newEditor,
    }
}

const undoAction = () => {
    return{
        type:EditorActions.UNDO
    }
}

const redoAction = () => {
    return {
        type: EditorActions.REDO,
    }
}

export{
    setIsChangingAction,
    importAction,
    setEditorAction,
    undoAction,
    redoAction,
    EditorActions,
}
