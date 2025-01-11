
import { editor } from "../data";
import { rootReducer } from "../redux/reducers/rootReducer";
import { loadlFromLocaleStorage } from "./localeStorage";
import { createStore } from 'redux';

const store = createStore(rootReducer, loadlFromLocaleStorage() || editor);

export{
    store,
}