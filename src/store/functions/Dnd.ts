import { SlideType } from "./PresentationType";

function swap(slides: SlideType[], payload: {draggedSlideId: string, targetSlideId: string}) {
    const { draggedSlideId  , targetSlideId } = payload;

    const updatedSlides  = [...slides]; 
    const draggedSlideIndex = slides.findIndex((slide) => slide.id === draggedSlideId);
    const targetSlideIndex = slides.findIndex((slide) => slide.id === targetSlideId);

    if (draggedSlideIndex !== -1 && targetSlideIndex !== -1) {
        const [removedSlide] = updatedSlides .splice(draggedSlideIndex, 1); 
        updatedSlides .splice(targetSlideIndex, 0, removedSlide); 

    }
    return updatedSlides;
}

export {swap};