import { addSlide } from "../../addSlide";
import { removeSlide } from "../../removeSlide";
import { UnknownAction } from "redux";
import {EditorType} from '../../EditorType'
import {SlideActionType} from '../actions/SlideActions'

const slideReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case SlideActionType.ADD_SLIDE: {
            return addSlide(state);
        }
        case SlideActionType.REMOVE_SLIDE: {
            return removeSlide(state);
        }
        default:
            return state;
    }
} 

export {
    slideReducer,
}