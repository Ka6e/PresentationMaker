import { SlideType } from "./PresentationType";

function moveElement(slide: SlideType, elementId: string,
    newX: number, newY: number
): SlideType {
    {
        return {
            ...slide,
            objects: slide.objects.map(item => 
                item.id === elementId ?{
                    ...item,
                    x: newX,
                    y: newY
                }: item
            )
        }
    }
}

export {
    moveElement,
}
