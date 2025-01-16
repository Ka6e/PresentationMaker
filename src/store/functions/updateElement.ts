import * as tool from './PresentationType'

function updateElement(slide: tool.SlideType, newElement: tool.TextObjectType): tool.SlideType{
    console.log('updated fun');
    return{
        ...slide,
        objects: slide.objects.map(item =>
            item.id === newElement.id
            ? {...item, ...newElement}
            : item
        )
    }
}

export { updateElement,}