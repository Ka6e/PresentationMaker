import { useState, useRef } from "react";
import { dispatch } from "../../store/functions/editor";
import { EditorType } from '../../store/functions/EditorType';
import { moveSlideElement } from "../../store//functions/moveSlideElement";

type UseDragAndDropProps = {
    slideId: string;
}

export function useDragAndDrop({slideId}: UseDragAndDropProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElemId, setDraggedElemId] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});
    const elementStartPos = useRef({x: 0, y: 0});

    function handleElementMD(event: React.MouseEvent, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElemId(elementId);
        dragStartPos.current = {x: event.clientX, y: event.clientY};

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            const element = slide?.objects.find(e => e.id === elementId);
            if (element) {
                elementStartPos.current = {x: element.x, y: element.y};
            }
            return currentEditor;
        });
    }

    function handleElementMM(event: React.MouseEvent): void {
        if (!isDragging || !draggedElemId) {
            return;
        }

        const dx = event.clientX - dragStartPos.current.x;
        const dy = event.clientY - dragStartPos.current.y;

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            if (!slide) return currentEditor;
            const element = slide.objects.find(e => e.id === draggedElemId);
            if (!element) return currentEditor;

            const newX = Math.max(0, Math.min(elementStartPos.current.x + dx, 935 - element.width));
            const newY = Math.max(0, Math.min(elementStartPos.current.y + dy, 525 - element.height));

            return moveSlideElement(currentEditor, slideId, draggedElemId, newX, newY);
        });
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