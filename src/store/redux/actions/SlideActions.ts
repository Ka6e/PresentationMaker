import {SlideType} from '../../functions/PresentationType'

enum SlideActionType {
    ADD_SLIDE = 'ADD_SLIDE',
    REMOVE_SLIDE = 'REMOVE_SLIDE',
    CHANGE_BACKGROUND = 'CHANGE_BACKGROUND',
    SET_COLOR = 'SET_COLOR',
    UPDATE_SLIDES = 'UPDATE_SLIDES',
}

const addSlideAction = () => {
    return {
        type: SlideActionType.ADD_SLIDE,
    };
}

const changeBackgroundAction = (newBackground: string) => {
    return {
        type: SlideActionType.CHANGE_BACKGROUND,
        payload: newBackground,
    };
}

const removeSlideAction = () => {
    return {
        type: SlideActionType.REMOVE_SLIDE,
    };
}

const setColorAction = (newColor: string) => {
    return {
        type: SlideActionType.SET_COLOR,
        payload: newColor,
    };
}

const updateSlideAction = (newSlides: SlideType[]) => {
    return {
        type: SlideActionType.UPDATE_SLIDES,
        payload: newSlides,
    }
}

export {
    addSlideAction,
    removeSlideAction,
    changeBackgroundAction,
    setColorAction,
    updateSlideAction,
    SlideActionType,
}

