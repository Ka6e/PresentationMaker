import { addSlide } from "../../addSlide";
import { removeSlide } from "../../removeSlide";
import { UnknownAction } from "redux";
import {EditorType} from '../../EditorType'
import {SlideActionType} from '../actions/SlideActions'
import { setColor, setImage } from "../../changeBackground";
import { SlideType } from "../../PresentationType";
import { updatedSlides } from "../../updateSlides";


const slideReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case SlideActionType.ADD_SLIDE: {
            return addSlide(state);
        }
        case SlideActionType.REMOVE_SLIDE: {
            return removeSlide(state);
        }
        case SlideActionType.CHANGE_BACKGROUND: {
            return setImage(state, action.payload as string);
        }
        case SlideActionType.SET_COLOR: {
            return setColor(state, action.payload as string);
        }
        case SlideActionType.UPDATE_SLIDES: {
            return updatedSlides(state, action.payload as SlideType[]);
        }
        default:
            return state;
    }
} 

export {
    slideReducer,
}