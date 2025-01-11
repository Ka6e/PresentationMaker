import {TextObjectType} from "../../store/PresentationType.ts";
import {CSSProperties, useState} from "react";
// import { SelectionType } from "../../store/EditorType.ts";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    isSelected: boolean,
}
function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(() => {
        const storedText = localStorage.getItem(`text_${textObject.id}`);
        return storedText ? storedText : textObject.value; 
    });
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.y * scale}px`,
        left: `${textObject.x * scale}px`,
        width: `${textObject.width * scale}px`,
        height: `${textObject.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        color: `${textObject.color}`,
        margin: `0`,
        border: isSelected ? '2px solid #0b57d0' : 'none',
    }

    const inputStyles: CSSProperties = {
        ...textObjectStyles,   
        fontSize: `${textObject.fontSize * scale}px`,  
        color: 'black',  
        backgroundColor: 'transparent', 
    };

    const handleDoubleClick = () => { setIsEditing(true); };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTextValue(e.target.value); };
    
    const handleBlur = () => { 
        setIsEditing(false); 
        localStorage.setItem(`text_${textObject.id}`, textValue);
    };

    const isTextEmpty = (textValue || '').trim() === ''; 

    return (
        <>
        {isEditing ? (
            <input type="text"
            value={textValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            style={{...inputStyles, fontSize: `${textObject.fontSize * scale}px`,}}
            />
        ): (
            <p onDoubleClick={handleDoubleClick}                     
            style={{
                ...textObjectStyles,
                border: isTextEmpty ? '2px dashed red' : textObjectStyles.border, // Если текст пустой, добавляем бордер
            }}>
                {textValue}
            </p>
        )}
        </>
    );
}

export {
    TextObject,
}
