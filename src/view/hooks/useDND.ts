import { useState, useRef } from "react";
// import { moveSlideElement } from "../../store//functions/moveSlideElement";
import { useAppSelector } from "./useAppSelector";
import { useDispatch } from "react-redux";
import { moveElementAction } from "../../store/redux/actions/elementActions";

type UseDragAndDropProps = {
    slideId: string;
}

export function useDragAndDrop({slideId}: UseDragAndDropProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElemId, setDraggedElemId] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});

    const elementRef = useRef<{x: number, y:number} | null>(null);

    const appdispatch = useDispatch();
    const editor = useAppSelector(state => state);

    function handleElementMD(event: React.MouseEvent, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElemId(elementId);
        dragStartPos.current = {x: event.clientX, y: event.clientY};

        const slide = editor.current.presentation.slides.find(s => s.id === slideId);
        const element = slide?.objects.find(e => e.id === elementId);
        if(element){
            elementRef.current = {x: element.x,  y: element.y};
        }
    }

    function handleElementMM(event: React.MouseEvent): void {
        if (!isDragging || !draggedElemId) {
            return;
        }

        const dx = event.clientX - dragStartPos.current.x;
        const dy = event.clientY - dragStartPos.current.y;

        const slide = editor.current.presentation.slides.find((s) => s.id === slideId);
        if (!slide) return;
    
        const element = slide.objects.find((el) => el.id === draggedElemId);
        if (!element) return;
    
        const startX = elementRef.current ? elementRef.current.x : element.x;
        const startY = elementRef.current ? elementRef.current.y : element.y;
    
        const newX = Math.max(0, Math.min(startX + dx, 935 - element.width));
        const newY = Math.max(0, Math.min(startY + dy, 525 - element.height));

        appdispatch(moveElementAction(slide.id, element.id, newX, newY))
    }

    function handleElementMU(): void {
        setIsDragging(false);
        setDraggedElemId(null);
    }

    return {
        isDragging, 
        handleElementMD, handleElementMM, handleElementMU,
    }
}