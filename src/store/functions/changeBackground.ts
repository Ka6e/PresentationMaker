import { EditorType } from "./EditorType";

function setColor(editor: EditorType, color: string): EditorType{
    const selectedSlideId = editor.selection?.selectedSlideId;

    const updatedSlides = editor.presentation.slides.map( slide =>
        slide.id ===selectedSlideId
        ? {...slide, 
            background: {
                type: 'solid' as const, 
                color: color,
            }
        }
        : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

function setImage(editor: EditorType, image: string): EditorType{
    const selectedSlideId = editor.selection?.selectedSlideId;

    const updatedSlides = editor.presentation.slides.map( slide =>
            slide.id ===selectedSlideId
            ? {...slide, 
                background: {
                    type: 'img' as const,
                    src: image,
                },
            } : slide
    );

    return{
        ...editor,
        presentation:{
            ...editor.presentation,
            slides:updatedSlides,
        }
    }
}

export {setColor, setImage };