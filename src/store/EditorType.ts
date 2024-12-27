import {PresentationType} from "./PresentationType.ts";

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