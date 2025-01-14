import * as tool from '../../../store/functions/PresentationType';
import { CSSProperties } from 'react'
// import { useAppSelector, UndoableState } from '../../../../store/store';
// import { useAppSelector } from '../../hooks/useAppSelector';
// import { HistoryManeger } from '../../../store/localeStorage/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectionAction } from '../../../store/redux/actions/presentationActions';
import { setIsChangingAction } from '../../../store/redux/actions/editorActions';
import { updateElementAction } from '../../../store/redux/actions/elementActions';
// import { updateElementAction } from '../../../../store/actions/editorSlideElementsActions';
// import { setIsChangingAction } from '../../../../store/actions/editorActions';
import { ImageObject } from './ImageObject';
import { TextObject } from './TextObject';
import { SelectionType } from '../../../store/functions/EditorType';

interface ELementProps {
    element: tool.SlideObject;
    scale: number;
    selected: SelectionType;
}

export const Element = React.memo(({element, scale = 1, selected}: ELementProps) => {
    const dispatch = useDispatch();
    const [isDragging, setIsDragging] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeDirection, setResizeDirection] = React.useState<string | null>(null);
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
    // const sizeSlide = useAppSelector((state: UndoableState) => state.present.presentation.sizeWorkspace);
    
    const sizeSlide = {
        width: 935,
        height: 525,
    }
    const isSelected = selected.selectedElementId === element.id;


    const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
    };

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
          e.stopPropagation();
    
          if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
    
            const updatedElement = {
              ...element,
              pos: {
                x: Math.max(0, Math.min(sizeSlide.width - element.width, newX / scale)),
                y: Math.max(0, Math.min(sizeSlide.height - element.height, newY / scale)),
              },
            };
            dispatch(setIsChangingAction(true));
            dispatch(updateElementAction(updatedElement));
          }
    
          if (isResizing && resizeDirection) {
            const deltaX = e.movementX / scale;
            const deltaY = e.movementY / scale;
    
            let newWidth = element.width;
            let newHeight = element.height;
            let newX = element.x;
            let newY = element.y;
    
            if (resizeDirection.includes('right')) {
              newWidth = Math.max(10, element.width + deltaX);
            }
            if (resizeDirection.includes('left')) {
              newWidth = Math.max(10, element.width - deltaX);
              newX = Math.min(sizeSlide.width - newWidth, Math.max(0, element.x + deltaX));
            }
            if (resizeDirection.includes('bottom')) {
              newHeight = Math.max(10, element.height + deltaY);
            }
            if (resizeDirection.includes('top')) {
              newHeight = Math.max(10, element.height - deltaY);
              newY = Math.min(sizeSlide.height - newHeight, Math.max(0, element.y + deltaY));
            }
    
            newWidth = Math.min(sizeSlide.width - newX, newWidth);
            newHeight = Math.min(sizeSlide.height - newY, newHeight);
    
            const updatedElement = {
              ...element,
              width: newWidth, 
              height: newHeight ,
              x: newX, 
              y: newY ,
            };
    
            dispatch(setIsChangingAction(true));
            dispatch(updateElementAction(updatedElement));
          }
        },
        [isDragging, isResizing, resizeDirection, element, scale, dragOffset.x, dragOffset.y, dispatch, sizeSlide.width, sizeSlide.height]
    );

    const handleMouseUp = React.useCallback(() => {
        dispatch(setIsChangingAction(false));
        setIsDragging(false);
        setIsResizing(false);
        setResizeDirection(null);
      }, [dispatch]);
    
      React.useEffect(() => {
        if (isDragging || isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
    });
    
    function onElementClick (slideId: string, elementId: string) {
        if(elementId !== selected?.selectedElementId) {
          dispatch(setSelectionAction({selectedSlideId: slideId, selectedElementId: elementId}));
        }
      };
    
      const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selected.selectedSlideId) {
            onElementClick(selected.selectedSlideId, element.id);
        }
        e.preventDefault();
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - element.x * scale,
          y: e.clientY - element.y * scale,
        });
      };
    
      const elementStyles: CSSProperties = {
        cursor: isDragging ? 'grabbing' : 'auto',
        width: element.width * scale,
        height: element.height * scale,
        position: 'absolute',
        top: element.y * scale,
        left: element.x * scale,
        borderWidth: `${4 * scale}px`,
        boxSizing: 'border-box',
        borderStyle: 'dotted',
        borderColor: isSelected ? '#1E2A78' : 'transparent',
      };
    
      const handleStyles: CSSProperties = {
        position: 'absolute',
        width: 8 * scale,
        height: 8 * scale,
        background: '#1E2A78',
      };
    
      const handlePositions = [
        { direction: 'top-left', style: { top: -5 * scale, left: -5 * scale, cursor: 'nwse-resize' } },
        { direction: 'top-right', style: { top: -5 * scale, right: -5 * scale, cursor: 'nesw-resize' } },
        { direction: 'bottom-left', style: { bottom: -5 * scale, left: -5 * scale, cursor: 'nesw-resize' } },
        { direction: 'bottom-right', style: { bottom: -5 * scale, right: -5 * scale, cursor: 'nwse-resize' } },
        { direction: 'top', style: { top: -5 * scale, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' } },
        { direction: 'bottom', style: { bottom: -5 * scale, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' } },
        { direction: 'left', style: { top: '50%', left: -5 * scale, transform: 'translateY(-50%)', cursor: 'ew-resize' } },
        { direction: 'right', style: { top: '50%', right: -5 * scale, transform: 'translateY(-50%)', cursor: 'ew-resize' } },
      ];


    return (
        <div
            style={elementStyles}
            onMouseDown={handleMouseDown}
            id={element.id}
        >
            {isSelected &&
                handlePositions.map((handle) => (
                    <div
                        key={handle.direction}
                        style={{...handleStyles, ...handle.style}}
                        onMouseDown={handleResizeStart(handle.direction)}
                    ></div>
                ))}
            {element.type === 'text' ? (
                <TextObject textObject={element}></TextObject>
            ): element.type === 'image'? (
                <ImageObject imageObject={element}></ImageObject>
            ): null
        }    
        </div>
    )
    });
