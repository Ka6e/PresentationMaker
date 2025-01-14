import { SlideType } from "./PresentationType";

function changeFontFamily(slide: SlideType, elementId: string, newFontFamily: string): SlideType{
    {
        return {
            ...slide,
            objects: slide.objects.map(item => 
                item.id === elementId && item.type === 'text' ?{
                    ...item,
                    fontFamily: newFontFamily,
                }: item
            )
        }
    }
}

export {
    changeFontFamily,
}