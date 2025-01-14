import { SlideType } from "./PresentationType";

function changeTextColor(slide: SlideType, elementId: string, newFontColor: string): SlideType 
{
    return {
        ...slide,
        objects: slide.objects.map(item =>
            item.id === elementId && item.type === "text" ? { 
                ...item, 
                color: newFontColor 
            } : item
        ),
    };
}

export {
    changeTextColor,
}