import { UnknownAction } from "redux";
import { ElementActions } from "../actions/elementActions";
import { EditorType } from "../../EditorType";
import { addImage, addText } from "../../addElement";
import { TextObjectType } from "../../PresentationType";
import { deleteElement } from "../../removeElement";
import { moveSlideElement } from "../../moveSlideElement";
import { changeFontFamily } from "../../changeFontFamily";
import { changeTextColor } from "../../changeTextColor";
import { decreaseSize, increaseSize } from "../../changeFontSize";
import { Slide } from "../../../view/slide/Slide";



const elementReducer = (state: EditorType, action: UnknownAction): EditorType => {
    switch(action.type){
        case ElementActions.ADD_IMAGE:{
            return addImage(state, action.payload as string);
        }
        case ElementActions.ADD_TEXT: {
            return addText(state, action.payload as TextObjectType)
        }
        case ElementActions.REMOVE_ELEMENT: {
            return deleteElement(state);
        }
        case ElementActions.MOVE_ELEMENT: {
            const { slideId, elementId, newX, newY } = action.payload;
            return moveSlideElement(state, slideId, elementId, newX, newY);
        }

        // case ElementActions.CHANGE_FONTFAMILY: {
        //     const { slideId, elementId, newFontFamily } = action.payload;
        //     return {
        //         ...state,
        //         presentation: {
        //             ...state.presentation,
        //             slides: state.presentation.slides.map(slide =>
        //                 slide.id === slideId
        //                 ? {
        //                     ...slide,
        //                     objects: slide.objects.map((obj) =>
        //                         obj.id === elementId && obj.type === 'text'
        //                             ? { ...obj, newFontFamily }
        //                             : obj
        //                     ),
        //                 }
        //               : slide
        //             ),
        //         }
        //     };
        // }
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
        default: 
            return state;
    }
}

export {
    elementReducer,
}