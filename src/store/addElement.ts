// import { editor } from "./data";
import { EditorType } from "./EditorType";
import { SlideObject, TextObjectType} from "./PresentationType";
import { v4 as uuidv4 } from 'uuid';

function addText(editor: EditorType, newElement: TextObjectType): EditorType {
    const selectedSlide = editor.selection?.selectedSlideId;

    if(!selectedSlide){
        console.log("Слайд не выбран");
        return editor;
    }

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

const newText:TextObjectType= {
    id: uuidv4(),
    x: 100,
    y: 100,
    width: 100,
    height: 24,
    type:'text',
    value: 'новый текст',
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',    
}

function addImage(editor: EditorType, newElement: string): EditorType{
    const selectedSlide = editor.selection?.selectedSlideId;

    if(!selectedSlide){
        console.log("Слайд не выбран");
        return editor;
    }

    const newImage:SlideObject= {
        id:uuidv4(),
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