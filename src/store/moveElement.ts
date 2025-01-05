import { EditorType } from "./EditorType";

function moveSlideElement(
    editor: EditorType, slideId: string, elementId: string,
    newX: number, newY: number
): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? {
                    ...slide,
                    objects: slide.objects.map(element =>
                        element.id === elementId ? {
                            ...element,
                             x: newX,
                             y: newY 
                        } : element
                    )
                } : slide
            )
        },
    };
}

export{ moveSlideElement}