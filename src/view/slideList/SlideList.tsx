import {SlideType} from "../../store/PresentationType.ts";
import {Slide} from '../slide/Slide.tsx'
import styles from './SlideList.module.css'
import {SelectionType} from "../../store/EditorType.ts";
import {dispatch} from "../../store/editor.ts";
import {setSelection} from "../../store/setSelection.ts";
import { useState } from "react";
import { swap } from "../../store/Dnd.ts";


const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: Array<SlideType>,
    selection: SelectionType,
}

function SlidesList({slides, selection }: SlidesListPros) {

    
    const [draggedSlideId, setdraggedSlide] = useState<string | null>(null);

    const handleDragStart = (slideId: string) => {
        setdraggedSlide(slideId);
    } 

    const handeDrop = (e: React.DragEvent, targetSlideId: string) => {
        e.preventDefault();
        if(draggedSlideId && draggedSlideId != targetSlideId){
            dispatch(swap, {draggedSlideId,targetSlideId});
            setdraggedSlide(null);
        }
    }
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }
    function onSlideClick(slideId: string) {
        dispatch(setSelection, {selectedSlideId: slideId})
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