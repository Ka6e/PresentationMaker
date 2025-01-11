import { useState, useRef } from "react";
// import {dispatch} from "../../store/editor"
// import { EditorType } from "../../store/EditorType";
// import { moveSlideElement } from "../../store/moveSlideElement";
import { useDispatch } from "react-redux";
// import { editor } from "../../store/data";
import { moveElementAction } from "../../store/redux/actions/elementActions";
import { useSelector } from "react-redux";
import { PresentationType, SlideObject, SlideType } from "../../store/PresentationType";

type UseDragAndDropProps = {
    slideId: string;
}

function UseDragAndDrop({slideId}: UseDragAndDropProps){
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElement, setDraggedElement] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});
    const elementStartPos = useRef({x: 0, y: 0});

    const appDispatch = useDispatch();
    
    const {presentation} = useSelector((state: { presentation: PresentationType}) => state);

    function handleElementMD(event: React.MouseEvent, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElement(elementId);
        dragStartPos.current = {x: event.clientX, y: event.clientY};

        // console.log("Start dragging:", elementId, dragStartPos.current);
        const slide = presentation.slides.find((s:SlideType) => s.id === slideId);
        if (slide) {
            const element = slide.objects.find((e: SlideObject)=> e.id === elementId);
            if (element) {
                elementStartPos.current = { x: element.x, y: element.y };
            }
            
        }
        // appDispatch((dispatch: any, getState: any) => {
        //     const state = getState();
        //     const slide = state.presentation.slides.find((s: SlideType) => s.id === slideId);
        //     const element = slide?.objects.find((e: SlideObject) => e.id === elementId);
        //     if (element) {
        //         elementStartPos.current = {x: element.x, y: element.y};
        //     }
        //     // return currentEditor;
        // });
    }

    function handleElementMM(event: React.MouseEvent): void {
        if (!isDragging || !draggedElement) {
            return;
        }

        const dx = event.clientX - dragStartPos.current.x;
        const dy = event.clientY - dragStartPos.current.y;

        const slide = presentation.slides.find((s: SlideType) => s.id === slideId);
        if(slide){
            const element = slide.objects.find((e: SlideObject) => e.id === draggedElement);
            if (element) {
                const newX = Math.max(0,Math.min(elementStartPos.current.x + dx, 935 - element.width));
                const newY = Math.max(0,Math.min(elementStartPos.current.y + dy, 525 - element.height));
                appDispatch(moveElementAction(slideId, draggedElement, newX, newY));
            }
        }

        // dispatch((currentEditor: EditorType) => {

        //     const slide = editor.presentation.slides.find(s => s.id === slideId);
        //     if (!slide) return;
        //     const element = slide.objects.find(e => e.id === draggedElement);
        //     if (!element) return;
    
        //     const newX = Math.max(0, Math.min(elementStartPos.current.x + dx, 935 - element.width));
        //     const newY = Math.max(0, Math.min(elementStartPos.current.y + dy, 525 - element.height));

        //     return moveSlideElement(currentEditor, slideId, draggedElement, newX, newY);
        // });
    }

    function handleElementMU(): void {
        setIsDragging(false);
        setDraggedElement(null);
    }

    return {
        isDragging, 
        handleElementMD, handleElementMM, handleElementMU,
    }
}

export {UseDragAndDrop}
