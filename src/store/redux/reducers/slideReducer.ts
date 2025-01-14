import { addSlide } from "../../functions/addSlide";
import { removeSlide } from "../../functions/removeSlide";
import { UnknownAction } from "redux";
import { EditorType } from '../../functions/EditorType'
import { SlideActionType } from '../actions/SlideActions'
import { setColor, setImage } from "../../functions/changeBackground";
import { SlideType } from "../../functions/PresentationType";
import { updatedSlides } from "../../functions/updateSlides";


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