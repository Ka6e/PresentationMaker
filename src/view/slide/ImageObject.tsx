import {ImageObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";

type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected, }: ImageObjectProps) {

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.y * scale}px`,
        left: `${imageObject.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
    }
    if (isSelected){
        imageObjectStyles.border = '2px solid #0b57d0';
    }

    return (
        <img  style={imageObjectStyles} src={`${imageObject.src}`}/>
    )
}

export {
    ImageObject,
}