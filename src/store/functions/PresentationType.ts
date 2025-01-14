type PresentationType = {
    title: string,
    slides: Array<SlideType>,
}

type Background = Image | Solid;

type Image = {
    type: 'img',
    src: string,
}

type Solid = {
    type: 'solid',
    color: string,
}

type SlideType = {
    id: string,
    objects: Array<SlideObject>,
    background: Background,
}

type SlideObject = TextObjectType | ImageObjectType

type BaseSlideObject = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
}

type TextObjectType = BaseSlideObject & {
    value: string,
    type: 'text',
    fontFamily: string,
    fontSize: number,
    color: string,
}

type ImageObjectType = BaseSlideObject & {
    type: 'image',
    src: string,
}

export type{
    PresentationType,
    SlideType,
    TextObjectType,
    ImageObjectType,
    SlideObject,
    Background,
    BaseSlideObject,
}