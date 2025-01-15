import { editor } from "../functions/data";
import { EditorType } from "../functions/EditorType";
import { rootReducer } from "../redux/reducers/rootReducer";
import { loadlFromLocaleStorage } from "./localeStorage";
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { thunk, ThunkAction } from "redux-thunk";
import { UnknownAction } from "redux";

export interface HistoryManeger {
    past: EditorType[];
    current: EditorType;
    future: EditorType[];
    isChanging: boolean;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  HistoryManeger,
  unknown,
  UnknownAction
>;

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    return result;
  };

const preloadedState: HistoryManeger = {
    past: [],
    current: loadlFromLocaleStorage() || editor,
    future: [],
    isChanging: false,
}

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, loggerMiddleware));

export{
    store,
}