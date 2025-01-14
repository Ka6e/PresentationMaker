import {Slide} from '../slide/Slide.tsx'
import styles from './SlideList.module.css'
import { SelectionType} from "../../store/functions/EditorType.ts";
import { useState } from "react";
import { swap } from "../../store/functions/Dnd.ts";
import { useDispatch } from "react-redux";
import { updateSlideAction } from "../../store/redux/actions/SlideActions.ts";
import { setSelectionAction } from "../../store/redux/actions/presentationActions.ts";
import { useAppSelector } from '../hooks/useAppSelector.ts';


const SLIDE_PREVIEW_SCALE = 0.2


function SlidesList() {

    const appDispath = useDispatch();
    const Slides = useAppSelector(state => state.current.presentation.slides);
    const selection = useAppSelector(state => state.current.selection);
    const [draggedSlideId, setdraggedSlide] = useState<string | null>(null);


    const handleDragStart = (slideId: string) => {
        setdraggedSlide(slideId);
    } 

    const handeDrop = (e: React.DragEvent, targetSlideId: string) => {
        e.preventDefault();
        
        if(draggedSlideId && draggedSlideId != targetSlideId){
            
            const updatedSlides = swap(Slides, { draggedSlideId, targetSlideId });
            appDispath(updateSlideAction(updatedSlides));
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
            {Slides.map(slide =>
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
                            showResizeHandles={false}
                        ></Slide>
                    </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}