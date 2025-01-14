import { SelectionType } from "../../functions/EditorType"

enum PresentationActionType  {
    SET_SELECTION = 'SET_SELECTION',
    RENAME_PRESENTATION = 'RENAME_PRESENTATION',
}

const renamePresentationTitleAction = (newTitle: string) => {
    return {
        type: PresentationActionType.RENAME_PRESENTATION,
        payload: newTitle,
    }
}

const setSelectionAction = (newSelection: SelectionType) => {
    return {
        type: PresentationActionType.SET_SELECTION,
        payload: newSelection,
    }
}

export {
    renamePresentationTitleAction,
    setSelectionAction,
    PresentationActionType,
}