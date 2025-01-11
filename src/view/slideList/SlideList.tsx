import {SlideType} from "../../store/PresentationType.ts";
import {Slide} from '../slide/Slide.tsx'
import styles from './SlideList.module.css'
import {EditorType, SelectionType} from "../../store/EditorType.ts";
import { useState } from "react";
import { swap } from "../../store/Dnd.ts";
import { useDispatch, useSelector } from "react-redux";
import { updateSlideAction } from "../../store/redux/actions/SlideActions.ts";
import { setSelectionAction } from "../../store/redux/actions/presentationActions.ts";
// import { editor } from "../../store/data.ts";


const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: Array<SlideType>,
    selection: SelectionType,
}

function SlidesList({slides, selection }: SlidesListPros) {

    const appDispath = useDispatch();
    const editor = useSelector((state: EditorType) => state);
    const [draggedSlideId, setdraggedSlide] = useState<string | null>(null);


    const handleDragStart = (slideId: string) => {
        setdraggedSlide(slideId);
    } 

    const handeDrop = (e: React.DragEvent, targetSlideId: string) => {
        e.preventDefault();
        
        if(draggedSlideId && draggedSlideId != targetSlideId){
            
            const updatedSlides = swap(editor, { draggedSlideId, targetSlideId });
            appDispath(updateSlideAction(updatedSlides.presentation.slides));
            setdraggedSlide(null);
        }
    }
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }
    function onSlideClick(slideId: string) {
        const selection: SelectionType = {
            selectedSlideId: slideId,
            selectedElementId: null,
        }
        appDispath(setSelectionAction(selection))
    }
    return (
        <div className={styles.slideList}>
            {slides.map(slide =>
                    <div 
                        key={slide.id}
                        draggable
                        onDragStart={() => handleDragStart(slide.id)}
                        onClick={() => onSlideClick(slide.id)}
                        onDrop={(e) => handeDrop(e, slide.id)}
                        onDragOver={(e) => handleDragOver(e)}
                    >
                        <Slide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={selection ? slide.id == selection.selectedSlideId : false}
                            className={styles.item}
                            selectedElementId={selection?.selectedElementId}
                        ></Slide>
                    </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}