import * as tool from '../../PresentationType'

enum ElementActions {
    REMOVE_ELEMENT = 'REMOVE_ELEMENT',
    ADD_IMAGE = 'ADD_IMAGE',
    ADD_TEXT = 'ADD_TEXT',
    MOVE_ELEMENT = 'MOVE_ELEMENT',
    CHANGE_FONTFAMILY = 'CHANGE_FONTFAMILY',
    CHANGE_COLOR = 'CHANGE_COLOR',
    INCREASE_SIZE = 'INCREASE_SIZE',
    DECREASE_SIZE = 'DECREASE_SIZE'
,}

const removeElementAction = () => {
    return {
        type: ElementActions.REMOVE_ELEMENT,
    }
}

const addTextAction = (newText: tool.TextObjectType) => {
    return {
        type: ElementActions.ADD_TEXT,
        payload: newText,
    }
}

const addImageAction = (newImage: string) => {
    return {
        type: ElementActions.ADD_IMAGE,
        payload: newImage,
    }
}

const moveElementAction = (slideId: string, elementId: string, newX: number, newY: number) => {
    return {
        type: ElementActions.MOVE_ELEMENT,
        payload: { slideId, elementId, newX, newY },
    }
};

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
    removeElementAction,
    addTextAction,
    addImageAction,
    moveElementAction,
    changeColorAction,
    increaseSizeAction,
    decreaseSizeAction,
    ElementActions,
}