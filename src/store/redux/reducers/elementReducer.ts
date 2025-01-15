import { UnknownAction } from "redux";
import { ElementActions } from "../actions/elementActions";
import { EditorType } from "../../functions/EditorType";
import { addImage, addText } from "../../functions/addElement";
import { SlideObject } from "../../functions/PresentationType";
import { deleteElement } from "../../functions/removeElement";
// import { moveSlideElement } from "../../functions/moveSlideElement";
import { changeFontFamily } from "../../functions/changeFontFamily";
import { changeTextColor } from "../../functions/changeTextColor";
import { decreaseSize, increaseSize } from "../../functions/changeFontSize";
import { updateElement } from "../../functions/updateElement";
import { moveSlideElement } from "../../functions/moveSlideElement";
import { moveElement } from "../../functions/moveElement";
import { resizeElement } from "../../functions/resizeElement";



const elementReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case ElementActions.ADD_IMAGE:{
            return addImage(state, action.payload as string);
        }
        case ElementActions.ADD_TEXT: {
            return addText(state)
        }
        case ElementActions.REMOVE_ELEMENT: {
            return deleteElement(state);
        }
        case ElementActions.MOVE_ELEMENT: {
            const {slideId, elementId, newX, newY} = action.payload;
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => 
                        slide.id === slideId
                        ? moveElement(slide, elementId, newX, newY)
                        : slide
                    )
                }
            }        
        }
        case ElementActions.RESIZE_ELEMENT: {
            const {slideId, elementId, newWidth, newHeight, newX, newY} = action.payload;
            return resizeElement(state, slideId, elementId, newX, newY, newWidth, newHeight);
        }
        case ElementActions.CHANGE_FONTFAMILY: {
            const {slideId, elementId, newFont} = action.payload;
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide =>
                        slide.id === slideId
                        ? changeFontFamily(slide, elementId, newFont)
                        : slide
                    ),
                }
            };
        }
        case ElementActions.CHANGE_COLOR: {
            const {slideId, elementId, newColor} = action.payload;
            return {
                ...state, 
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide =>
                        slide.id === slideId 
                        ? changeTextColor(slide, elementId, newColor)
                        : slide
                    ),
                }
            };
        }
        case ElementActions.INCREASE_SIZE: {
            const { slideId, elementId } = action.payload;
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => 
                        slide.id === slideId
                        ? increaseSize(slide, elementId)
                        : slide
                    ),
                }
            };
        }
        case ElementActions.DECREASE_SIZE: {
            const {slideId, elementId} = action.payload;
            return {
                ...state,
                presentation: {
                    ...state.presentation,
                    slides: state.presentation.slides.map(slide => 
                        slide.id === slideId
                        ? decreaseSize(slide, elementId)
                        : slide
                    ),
                }
            };
        }
        case ElementActions.UPDATE_ELEMENT: {
            return updateElement(state, action.payload as SlideObject);
        }
        default: 
            return state;
    }
}

export {
    elementReducer,
}