import {SlideType} from "../../store/PresentationType.ts";
import {TextObject} from "./TextObject.tsx";
import {ImageObject} from "./ImageObject.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";
import { SelectionType } from "../../store/EditorType.ts";
import {UseDragAndDrop} from "./useDragAndDrop.ts"
import { useResizeElement } from "./useResize.ts";
import { setSelectionAction } from "../../store/redux/actions/presentationActions.ts";
import { useDispatch } from "react-redux";
// import { editor } from "../../store/data.ts";



const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedElementId: string | null,
    selection?: SelectionType,
    showResizeHandles?: boolean
}

function Slide({slide, scale = 1, isSelected, className, selectedElementId, showResizeHandles = true}: SlideProps) {

    const appDispatch = useDispatch();

    const { handleElementMD, handleElementMM, handleElementMU } = UseDragAndDrop({ slideId: slide?.id ?? ''});
    const { isResizing, handleResizeMD, handleResizeMM, handleResizeMU} = useResizeElement({ slideId: slide?.id ?? ''});

    function onObjectClick(objectId: string): void{
        const selection: SelectionType = {
            selectedSlideId: slide?.id || null,
            selectedElementId: objectId,
        }
        appDispatch(setSelectionAction(selection));
    }

    const handleElementBlur = () => {
        const selection: SelectionType = {
            selectedSlideId: slide?.id || null,
            selectedElementId: null,
        }
        appDispatch(setSelectionAction(selection));
    };

    if (!slide) {
        return null;
    }

    const slideStyles:CSSProperties = {
        backgroundColor: slide.background.type == 'solid' ? slide.background.color: '#FFFFFF',
        backgroundImage: slide.background.type == 'img' ? `url(${slide.background.src})`: 'none',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        position: 'relative',
    }
    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }
    return (
        <div
            style={slideStyles}
            className={`${styles.slide} ${className}`}
            onMouseMove={(event) => {
                if (isResizing) {
                    handleResizeMM(event);
                } else {
                    handleElementMM(event);
                }
            }}
            onMouseUp={() => {
                handleElementMU();
                handleResizeMU();
            }}
            onClick={handleElementBlur}>
            {slide.objects.map(SlideElement => {
                const isSelectionElem = SlideElement.id === selectedElementId;
                return (
                    <div
                        key={SlideElement.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onObjectClick(SlideElement.id);
                        }}
                        onMouseDown={(e) => handleElementMD(e, SlideElement.id)}
                        style={{ position: 'relative' }}>
                        {SlideElement.type === "text" && (
                            <TextObject
                                textObject={SlideElement}
                                scale={scale}
                                isSelected={isSelectionElem}
                            />
                        )}
                        {SlideElement.type === "image" && (
                            <ImageObject
                                imageObject={SlideElement}
                                scale={scale}
                                isSelected={isSelectionElem}
                            />
                        )}
                        {isSelectionElem && showResizeHandles && (
                            <>
                                <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'top-left')}
                                style={{position: 'absolute', top: SlideElement.y - 5, left: SlideElement.x - 5}}/>

                                <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'top-right')}
                                style={{position: 'absolute', top: SlideElement.y - 5, left: SlideElement.x + SlideElement.width - 3}}/>

                                <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'bottom-left')}
                                style={{position: 'absolute', top: SlideElement.y + SlideElement.height - 3, left: SlideElement.x - 6}}/>

                                <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'bottom-right')}
                                style={{position: 'absolute', top: SlideElement.y + SlideElement.height - 3, left: SlideElement.x + SlideElement.width - 3}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-left')}
                                style={{position: 'absolute', top: SlideElement.y + SlideElement.height / 2, left: SlideElement.x - 6}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-right')}
                                style={{position: 'absolute', top: SlideElement.y + SlideElement.height / 2, left: SlideElement.x + SlideElement.width - 3}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleTop}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-top')}
                                style={{position: 'absolute', top: SlideElement.y - 5, left: SlideElement.x + SlideElement.width / 2}}/>

                                <div className={`${styles.resizeHandle} ${styles.middleBottom}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideElement.id, 'middle-bottom')}
                                style={{position: 'absolute', top: SlideElement.y + SlideElement.height - 3, left: SlideElement.x + SlideElement.width / 2}}/>
                            </>
                            )}
                    </div>
                );
            })}
        </div>
    );
    
}

export {
    Slide
}
