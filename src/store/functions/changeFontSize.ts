import { SlideType } from "./PresentationType";


function increaseSize(slide: SlideType, elementId: string): SlideType{
    return{
        ...slide,
        objects: slide.objects.map(item => 
            item.id === elementId && item.type === "text" ? {
                ...item,
                fontSize: item.fontSize + 2,
            }
            : item
        ), 
    };
}

function decreaseSize(sldie: SlideType, elementId: string): SlideType{
    return {
        ...sldie,
        objects: sldie.objects.map(item =>
            item.id === elementId && item.type === "text"? {
                ...item,
                fontSize: item.fontSize - 2,
            }
            : item
        ),
    };
}

export {
    increaseSize,
    decreaseSize,
}