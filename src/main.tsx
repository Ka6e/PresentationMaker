import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {addEditorChangeHandler} from "./store/functions/editor.ts";
import { Provider } from 'react-redux';
import { store } from './store/storage/store.ts';



const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()