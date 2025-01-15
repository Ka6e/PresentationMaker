import { useState, useRef } from 'react';
import { useAppSelector } from './useAppSelector';
import { useDispatch } from 'react-redux';
import { resizeElementAction } from '../../store/redux/actions/elementActions';

type UseResizeElementProps = {
  slideId: string;
};

function useResizeElement({ slideId }: UseResizeElementProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizedElementId, setResizedElementId] = useState<string | null>(null);
  const startSize = useRef({ width: 0, height: 0 });
  const startMousePos = useRef({ x: 0, y: 0 });
  const initialPosition = useRef({ x: 0, y: 0 });
  const resizeDirection = useRef<string | null>(null);
  const editor = useAppSelector(state => state)
  const appDispatch = useDispatch();

  function handleResizeMD(event: React.MouseEvent<HTMLDivElement>, elementId: string, direction: string): void {
    event.preventDefault();
    setIsResizing(true);
    setResizedElementId(elementId);
    resizeDirection.current = direction;
    startMousePos.current = { x: event.clientX, y: event.clientY };


    const slide = editor.current.presentation.slides.find(s => s.id === slideId);
    const element = slide?.objects.find(e => e.id === elementId);
    if (element) {
      startSize.current = { width: element.width, height: element.height };
      initialPosition.current = { x: element.x, y: element.y };
    }
  }

  function handleResizeMM(event: React.MouseEvent<HTMLDivElement>): void {
    if (!isResizing || !resizedElementId) {
      return;
    }

    const deltaX = event.clientX - startMousePos.current.x;
    const deltaY = event.clientY - startMousePos.current.y;

    let newWidth = startSize.current.width;
    let newHeight = startSize.current.height;
    let newX = initialPosition.current.x;
    let newY = initialPosition.current.y;

    switch (resizeDirection.current) {
      case 'top-left':
        newX = initialPosition.current.x + deltaX;
        newY = initialPosition.current.y + deltaY;
        newWidth = Math.max(10, startSize.current.width - deltaX);
        newHeight = Math.max(10, startSize.current.height - deltaY);
        break;

      case 'top-right':
        newY = initialPosition.current.y + deltaY;
        newWidth = Math.max(10, startSize.current.width + deltaX);
        newHeight = Math.max(10, startSize.current.height - deltaY);
        break;

      case 'bottom-left':
        newX = initialPosition.current.x + deltaX;
        newWidth = Math.max(10, startSize.current.width - deltaX);
        newHeight = Math.max(10, startSize.current.height + deltaY);
        break;

      case 'bottom-right':
        newWidth = Math.max(10, startSize.current.width + deltaX);
        newHeight = Math.max(10, startSize.current.height + deltaY);
        break;

      case 'middle-left':
        newX = initialPosition.current.x + deltaX;
        newWidth = Math.max(10, startSize.current.width - deltaX);
        break;

      case 'middle-right':
        newWidth = Math.max(10, startSize.current.width + deltaX);
        break;

      case 'top-middle':
        newY = initialPosition.current.y + deltaY;
        newHeight = Math.max(10, startSize.current.height - deltaY);
        break;

      case 'bottom-middle':
        newHeight = Math.max(10, startSize.current.height + deltaY);
        break;
    }

    // Проверка границ
    if (newX < 0) {
        newWidth += newX;
        newX = 0;
    }
    if (newY < 0) {
        newHeight += newY;
        newY = 0;
    }
    // Вызов функции изменения размера из useAppActions
    appDispatch(resizeElementAction(slideId, resizedElementId, newWidth, newHeight, newX, newY));
  }

  function handleResizeMU(): void {
    setIsResizing(false);
    setResizedElementId(null);
    resizeDirection.current = null;
  }

  return {
    isResizing,
    handleResizeMD,
    handleResizeMM,
    handleResizeMU,
  };
}

export { useResizeElement };