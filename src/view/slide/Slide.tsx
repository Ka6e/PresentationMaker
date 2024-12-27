import {SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties,  useRef, useState} from "react";
import { dispatch } from "../../store/editor.ts";
import { SelectionType } from "../../store/EditorType.ts";
import { setSelection } from "../../store/setSelection.ts";



const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedElementId: string | null,
    selection?: SelectionType
}

function Slide({slide, scale = 1, isSelected, className, selectedElementId}: SlideProps) {
    
    const elementRefs = useRef<Record<string, HTMLDivElement | null>>({});
    // const [pos, setPos] = useState({x:0, y:0});

    function onObjectClick(objectId: string): void{
        if(elementRefs.current){
            const element = elementRefs.current[objectId];
            if (element) {
                const rect = element.getBoundingClientRect();
                console.log("Координаты элемента:", {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                });
        }
        
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedElementId: objectId,
        });
        }
    }


    if (!slide) {
        return null;
    }

    const slideStyles:CSSProperties = {
        backgroundColor: slide.background.type == 'solid' ? slide.background.color: '#FFFFFF',
        backgroundImage: slide.background.type == 'img' ? `url(${slide.background.src})`: 'none',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }
    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }
    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.objects.map(slideObject => {
                switch (slideObject.type) {
                    case "text": 
                        return <div 
                        key={slideObject.id}
                        onClick={() => onObjectClick(slideObject.id)}
                        ref={(el) => (elementRefs.current[slideObject.id] = el)}
                        >
                            <TextObject
                                    key={slideObject.id} 
                                    textObject={slideObject} 
                                    scale={scale} 
                                    isSelected={slideObject.id == selectedElementId}></TextObject>
                                </div>
                    case "image":
                        return <div 
                        key={slideObject.id}  
                        onClick={() => onObjectClick(slideObject.id)}
                        ref={(el) => (elementRefs.current[slideObject.id] = el)}> 
                                    <ImageObject
                                    key={slideObject.id} 
                                    imageObject={slideObject} 
                                    scale={scale} 
                                    isSelected={slideObject.id == selectedElementId}/>
                                </div>
                    default:
                        throw new Error(`Unknown slide type: ${slideObject}`)
                }
            })}
        </div>
    )
}

export {
    Slide
}