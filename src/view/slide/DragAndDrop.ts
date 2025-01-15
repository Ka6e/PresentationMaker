import { useState, useRef, useEffect } from 'react';

function useDrag(
  initialPosition: { x: number; y: number; width?: number; height?: number },
  onDragEnd?: (newPosition: { x: number; y: number }) => void,
  slideWidth: number = 935, // Ширина слайда по умолчанию
  slideHeight: number = 525, // Высота слайда по умолчанию
  scale: number = 1, // Масштаб объекта
  getActualSize?: () => { width: number; height: number } // Функция для получения фактических размеров
) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const startDragging = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { x: position.x, y: position.y };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;

        // Новые координаты объекта
        let newX = elementStartPos.current.x + dx;
        let newY = elementStartPos.current.y + dy;

        // Получаем фактические размеры объекта
        const actualWidth = getActualSize ? getActualSize().width : (initialPosition.width || 0) * scale;
        const actualHeight = getActualSize ? getActualSize().height : (initialPosition.height || 0) * scale;

        // Ограничиваем координаты границами слайда
        newX = Math.max(0, Math.min(newX, slideWidth - actualWidth));
        newY = Math.max(0, Math.min(newY, slideHeight - actualHeight));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (typeof onDragEnd === 'function') {
        onDragEnd(position);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, onDragEnd, slideWidth, slideHeight, initialPosition.width, initialPosition.height, scale, getActualSize]);

  return { position, startDragging };
}

export {useDrag};