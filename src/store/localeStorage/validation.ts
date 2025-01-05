import Ajv from "ajv";

const elementSchema = {
    type: "object",
    properties: {
        id: {type: "string"},
        type: {
            type: "string",
            enum: ["text", "image"],
        },
        x: {type: "number"},
        y: {type: "number"},
        width: {type: "number"},
        height: {type: "number"},

        text: {type: "string"},
        fontFamily: {type: "string"},
        fontSize: {type: "number"},
        color: {type: "string"},

        src: {type: "string"},
    },
    required: ['id', 'type', 'x', 'y', 'width', 'height'],
    additionalProperties: false,
};


const slideSchema = {
    type: "object",
    properties: {
        id: {type: "string"},
        objects: {
            type: "array",
            items: elementSchema,
        },
        background: {
            type: "object",
            properties: {
                type: { type: "string", enum: ["solid", "img"]},
                color: {type: "string"},
                src: {type: "string"},
            },
            required: ['type'],
            additionalProperties: false, 
        },
    },
    required: ['id', 'objects', 'background'],
    additionalProperties: false,
};


const presentationSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        slides: {
            type: 'array',
            items: slideSchema,
        },
    },
    required: ['title', 'slides'],
    additionalProperties: false,
};


const editorSchema = {
    type: "object",
    properties: {
        presentation: presentationSchema,
        selection: {
            type: "object",
            properties: {
                selectedSlideId: { type: ["string", "null"] },
                selectedElementId: { type: ["string", "null"] },
            },
            additionalProperties: false,
        },
    },
    required: ["presentation", "selection"],
    additionalProperties: false,
};


const ajv = new Ajv();
const validate = ajv.compile(editorSchema);

export{
    validate,
}