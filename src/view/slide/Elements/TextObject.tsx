import {TextObjectType} from "../../../store/functions/PresentationType";
import {CSSProperties,  useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { updateElementAction } from "../../../store/redux/actions/elementActions";
import { useAppSelector } from "../../hooks/useAppSelector";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    isSelected: boolean,
}
function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {

    const appDispatch = useDispatch();
    const textRef = useRef<HTMLInputElement | null>(null);
    const editor = useAppSelector(state => state);
    const selectedSlide = editor.current.selection.selectedSlideId;
    const slide = editor.current.presentation.slides.find(s => s.id === selectedSlide);
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
        fontFamily: `${textObject.fontFamily}`,
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const newValue = e.target.value;
        setTextValue(newValue);

        if(slide){
            const updatedElement = {
                ...textObject,
                value: newValue,
            }
            console.log('updated elem');
            appDispatch(updateElementAction(slide.id, updatedElement));
        };

     };
    
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
            ref={textRef}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            style={{...inputStyles, fontSize: `${textObject.fontSize * scale}px`,}}
            />
        ): (
            <p onDoubleClick={handleDoubleClick}                     
            style={{
                ...textObjectStyles,
                border: isTextEmpty ? '2px dashed red' : textObjectStyles.border,
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
