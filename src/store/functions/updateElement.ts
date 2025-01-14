import * as tool from './PresentationType'
import { EditorType } from './EditorType';

function updateElement(editor: EditorType, newElement: tool.SlideObject): EditorType {
    const slideId = editor.selection.selectedSlideId;
    if (!slideId) {
        return { ...editor };
    }
    return {
        ...editor, 
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => slide.id === slideId ?
             {...slide, elements: slide.objects.map(element => element.id === newElement.id ? {...element, ...newElement}: element) } : slide)
            }
    }
}

export { updateElement,}