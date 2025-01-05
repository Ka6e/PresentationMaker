import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {addEditorChangeHandler, getEditor} from "./store/editor.ts";
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            {/* <Provider store={store}> */}
                <App editor={getEditor()}/>
            {/* </Provider> */}
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()