import {PresentationType, SlideType} from "./PresentationType.ts";
import {EditorType} from "./EditorType.ts";
import Image from '../../previewfile_2406870583.jpg'

const slide1: SlideType = {
    id: 'slide-1',
    objects: [
        {
            id: 'slide-object-1',
            x: 10,
            y: 100,
            width: 250,
            height: 135,
            type: "text",
            text: 'TEST1',
            fontFamily: 'Roboto',
            fontSize: 100,
            color: '#000000',
        },
        {
            id: 'slide-object-2',
            x: 50,
            y: 70,
            width: 50,
            height: 50,
            type: "image",
            src: Image,
        }
    ],
    
    background: {
        type: 'solid',
        color: 'green',
    }
}

const slide2: SlideType = {
    id: 'slide-2',
    objects: [
        {
            id: 'slide-object-3',
            x: 10,
            y: 10,
            width: 100,
            height: 30,
            type: "text",
            text: 'Testik',
            fontFamily: 'Roboto',
            fontSize: 20,
            color: '#000000',
        }
    ],
    background: {
        type: "solid",
        color: '#ff1717',
    }
}

const presentation: PresentationType = {
    title: 'Моя презентация',
    slides: [
        slide1,
        slide2,
    ]
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedElementId: null,
    }
}

export {
    editor,
}
