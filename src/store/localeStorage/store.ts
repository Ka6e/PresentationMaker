import { editor } from "../functions/data";
import { EditorType } from "../functions/EditorType";
import { rootReducer } from "../redux/reducers/rootReducer";
import { loadlFromLocaleStorage } from "./localeStorage";
import { legacy_createStore as createStore } from 'redux';

export interface HistoryManeger {
    past: EditorType[];
    current: EditorType;
    future: EditorType[];
    isChanging: boolean;
}

const preloadedState: HistoryManeger = {
    past: [],
    current: loadlFromLocaleStorage() || editor,
    future: [],
    isChanging: false,
}

const store = createStore(rootReducer, preloadedState);

export{
    store,
}