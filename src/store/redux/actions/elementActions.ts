enum ElementActions {
    UPDATE_ELEMENT = 'UPDATE_ELEMENT',
    REMOVE_ELEMENT = 'REMOVE_ELEMENT',
    ADD_IMAGE = 'ADD_IMAGE',
    ADD_TEXT = 'ADD_TEXT',
}

const removeElementAction = () => {
    return {
        type: ElementActions.REMOVE_ELEMENT,
    }
}


export {
    removeElementAction,
}