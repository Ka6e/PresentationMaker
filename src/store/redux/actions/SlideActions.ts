enum SlideActionType {
    ADD_SLIDE = 'ADD_SLIDE',
    REMOVE_SLIDE = 'REMOVE_SLIDE',
}

const addSlideAction = () => {
    return {
        type: SlideActionType.ADD_SLIDE,
    };
}

const removeSlideAction = () => {
    return {
        type: SlideActionType.REMOVE_SLIDE,
    };
}

export {
    addSlideAction,
    removeSlideAction,
    SlideActionType,
}

