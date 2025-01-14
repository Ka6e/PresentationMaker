import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";

function updatedSlides(editor: EditorType, updatedSlides: SlideType[]){
    return {
        ...editor, 
        presentation: {
            ...editor.presentation,
            slides: updatedSlides, 
        },
    };
}

export {
    updatedSlides,
}