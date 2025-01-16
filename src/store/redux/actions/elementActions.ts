import * as tool from '../../functions/PresentationType'

enum ElementActions {
    REMOVE_ELEMENT = 'REMOVE_ELEMENT',
    UPDATE_ELEMENT = 'UPDATE_ELEMENT',
    ADD_IMAGE = 'ADD_IMAGE',
    ADD_TEXT = 'ADD_TEXT',
    MOVE_ELEMENT = 'MOVE_ELEMENT',
    CHANGE_FONTFAMILY = 'CHANGE_FONTFAMILY',
    CHANGE_COLOR = 'CHANGE_COLOR',
    INCREASE_SIZE = 'INCREASE_SIZE',
    DECREASE_SIZE = 'DECREASE_SIZE',
    RESIZE_ELEMENT = 'RESIZE_ELEMENT',
}


const removeElementAction = () => {
    return {
        type: ElementActions.REMOVE_ELEMENT,
    }
}

const updateElementAction = (slideId: string, element: tool.TextObjectType) => {
    console.log('action');
    return{
        type: ElementActions.UPDATE_ELEMENT,
        payload: {slideId, element},
    }
}

const addTextAction = () => {
    return {
        type: ElementActions.ADD_TEXT,
    }
}

const addImageAction = (newImage: string) => {
    return {
        type: ElementActions.ADD_IMAGE,
        payload: newImage,
    }
}

const moveElementAction = (slideId: tool.SlideType, elementId: string, newX: number, newY: number) => {
    return {
        type: ElementActions.MOVE_ELEMENT,
        payload: { slideId, elementId, newX, newY },
    }
};

const resizeElementAction = (slideId: string, elementId: string, newWidth: number, newHeight: number,  newX: number, newY: number) => {
    return {
        type: ElementActions.RESIZE_ELEMENT,
        payload: {slideId, elementId, newWidth, newHeight, newX, newY},
    }
}

const changeFontFamilyAction = (slideId: string, elementId: string, newFontFamily: string) => {
    return {
        type: ElementActions.CHANGE_FONTFAMILY,
        payload: {slideId, elementId,newFontFamily}
    }
}

const changeColorAction = (slideId: string, elementId: string, newColor: string) => {
    return {
        type: ElementActions.CHANGE_COLOR,
        payload: {slideId, elementId, newColor},
    }
}

const increaseSizeAction = (slideId: string, elementId: string) => {
    return {
        type: ElementActions.INCREASE_SIZE,
        payload: {slideId, elementId},
    }
}

const decreaseSizeAction = (slideId: string, elementId: string) => {
    return {
        type: ElementActions.DECREASE_SIZE,
        payload: {slideId, elementId},
    }
}



export {
    changeFontFamilyAction,
    updateElementAction,
    removeElementAction,
    addTextAction,
    addImageAction,
    moveElementAction,
    changeColorAction,
    increaseSizeAction,
    decreaseSizeAction,
    resizeElementAction,
    ElementActions,
}