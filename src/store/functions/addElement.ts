import { EditorType } from "./EditorType";
import { SlideObject, TextObjectType} from "./PresentationType";
import { uuidV4 } from './uuidV4';

const newText = (): TextObjectType => ({
    id: uuidV4(),
    x: 100,
    y: 100,
    width: 100,
    height: 24,
    type: 'text',
    value: 'новый текст',
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#000000',
});

function addText(editor: EditorType): EditorType {
    const selectedSlide = editor.selection?.selectedSlideId;

    if(!selectedSlide){
        console.log("Слайд не выбран");
        return editor;
    }

    const newElement = newText();
    
    const updatedSlides = editor.presentation.slides.map(
        slide => slide.id === selectedSlide
        ?{...slide, objects: [...slide.objects, newElement]}
        : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides:updatedSlides,
        },
    };
}


function addImage(editor: EditorType, newElement: string): EditorType{
    const selectedSlide = editor.selection?.selectedSlideId;

    if(!selectedSlide){
        console.log("Слайд не выбран");
        return editor;
    }

    const newImage:SlideObject= {
        id:uuidV4(),
        x: 250,
        y: 250,
        width: 360,
        height: 250,
        type:'image',
        src: newElement,
    };

    console.log("Добавляем изображение:", newImage);

    const updatedSlides = editor.presentation.slides.map(
        slide => slide.id === selectedSlide
        ?{...slide, objects: [...slide.objects, newImage]}
        : slide
    );

    console.log("Обновлённые слайды:", updatedSlides);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides:updatedSlides,
        },
    };
}





export { addText,  addImage, newText}