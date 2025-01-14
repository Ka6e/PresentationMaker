import { EditorType } from "./EditorType";


function resizeElement(    
    editor: EditorType, 
    slideId: string, 
    elementId: string, 
    newX: number, 
    newY: number,
    newWidth: number,
    newHeight: number
): EditorType {
    
    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id !== slideId) return slide;

        const updatedObjects = slide.objects.map(el => {
            if (el.id !== elementId) return el;

            return {
                ...el, 
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight,
            };
        });

        return { ...slide, objects: updatedObjects };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

export {resizeElement}