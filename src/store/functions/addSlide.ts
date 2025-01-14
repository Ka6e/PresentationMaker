import { EditorType} from "./EditorType";
import { SlideType } from "./PresentationType";
import { uuidV4 } from './uuidV4'; 

function addSlide(editor: EditorType): EditorType {
    const newSlide: SlideType = {
        id: uuidV4(),
        objects: [],
        background: {
            type: 'solid',
            color: '#FFFFFF',
        },
    }
    
    const SelectedSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selection.selectedSlideId
    );

    let newSlides;
    if(SelectedSlideIndex != -1){
       
       newSlides = [ ...editor.presentation.slides.slice(0, SelectedSlideIndex + 1),
        newSlide,
        ...editor.presentation.slides.slice(SelectedSlideIndex + 1),
       ]
    }else{
        newSlides = [... editor.presentation.slides, newSlide];
    }

    console.log('editor', editor);
    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: newSlide.id,
            selectedElementId: null,
        },
    }
}

export { addSlide };
