import {PresentationType} from "../functions/PresentationType";

type SelectionType = {
    selectedSlideId: string | null,
    selectedElementId: string | null,
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType,
}

export type{
    EditorType,
    SelectionType,
}