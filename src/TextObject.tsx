import {TextObjectType} from "";
import { CSSProperties } from "react";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
}

function TextObject({textObject, scale = 1}: TextObjectProps) {
    const TextObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.y * scale}px`,
        left: `${textObject.x *  scale}px`,
        width: `${textObject.width  * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
    }

    return (
        <p style={TextObjectStyles}>{textObject.text}</p>
    )
}

export {
    TextObject,
}