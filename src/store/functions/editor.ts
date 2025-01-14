import { editor } from "./data.ts"
import { loadlFromLocaleStorage, saveToLocaleStorage } from "../localeStorage/localeStorage.ts"

let _editor = loadlFromLocaleStorage() || editor; 
let _handler = null //: Function | null = null 

function getEditor() 
{
    loadlFromLocaleStorage();
    return _editor
}

function setEditor(newEditor: any) 
{
    _editor = newEditor
    saveToLocaleStorage(_editor);
}

function dispatch(modifyFn: Function, payload?: Object): void 
{
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)
    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void
{
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}