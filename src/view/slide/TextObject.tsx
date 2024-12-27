import {TextObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";
import { SelectionType } from "../../store/EditorType.ts";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    isSelected: boolean,
}
function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {

    // const ref = useRef<HTMLParagraphElement>(null);
    // const onTextClick = () => {
    //     if (ref.current) {
    //       const rect = ref.current.getBoundingClientRect();
    //       console.log("Координаты элемента:", rect.top, rect.left);
    //     }
    //   };
    
    
    // function onObjectClick(): void{
    //     dispatch(setSelection, {
    //         selectedSlideId: selection.selectedSlideId,
    //         selectedElementId: textObject.id,
    //     });
    //     onTextClick();
    // }
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.y * scale}px`,
        left: `${textObject.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        color: `${textObject.color}`,
        margin: `0`,
    }
    if(isSelected){
        textObjectStyles.border = '3px solid #0b57d0';
    }
    return (
        <p  style={textObjectStyles}>{textObject.text}</p>
    )
}

export {
    TextObject,
}