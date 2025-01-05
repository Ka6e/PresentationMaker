import { validate } from "./validation";
import { EditorType } from "../EditorType";

function saveToLocaleStorage(editor: EditorType): void {
    try {
        const isValid = validate(editor);
        if (!isValid) {
            console.error('Validation failed:', validate.errors);  // Добавьте вывод ошибок
            throw new Error('Invalid data');
        }
        const editorJSON = JSON.stringify(editor);
        localStorage.setItem('editor', editorJSON);
    } catch (error) {
        console.error('Ошибка сохранения редактора:', error);
    }
}


function loadlFromLocaleStorage(): EditorType | null {
    try {
        const editorJSON = localStorage.getItem('editor');
        if (!editorJSON) {
            throw new Error('No data found in localStorage');
        }
        const parsedEditor = JSON.parse(editorJSON) as EditorType;
        const isValid = validate(parsedEditor);
        if (!isValid) {
            console.error('Validation failed:', validate.errors);  // Добавьте вывод ошибок
            throw new Error('Invalid data');
        }

        return parsedEditor;
    } catch (error) {
        console.error('Ошибка загрузки редактора:', error);
        return null;
    }
}

export {
    saveToLocaleStorage,
    loadlFromLocaleStorage,
}
