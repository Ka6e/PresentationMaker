import { EditorType } from "./EditorType";

function Swap(editor: EditorType, payload: {draggedSlideId: string, targetSlideId: string}) {
    const { draggedSlideId, targetSlideId } = payload;

    const slides = [...editor.presentation.slides]; 
    const draggedSlideIndex = slides.findIndex((slide) => slide.id == draggedSlideId);
    const targetSlideIndex = slides.findIndex((slide) => slide.id == targetSlideId);

    if (draggedSlideIndex !== -1 && targetSlideIndex !== -1) {
        const [removedSlide] = slides.splice(draggedSlideIndex, 1); 
        slides.splice(targetSlideIndex, 0, removedSlide); 

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: slides,
            },
        }
    }
    return editor;
}

export {Swap};