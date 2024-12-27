import styles from './App.module.css'
import {SlidesList} from "./view/SlideList.tsx";
import {TopPanel} from "./view//TopPanel/TopPanel.tsx";
import {Workspace} from "./view/Workspace/Workspace.tsx";
import {EditorType} from "./store/EditorType.ts";
import { useEffect, useState } from 'react';



type AppProps = {
    editor: EditorType,
}
function App({editor}: AppProps) {

    const [editorState, setEditorState] = useState<EditorType>(editor);

    useEffect(() => {
        const data = localStorage.getItem("editor");
        if(data){
            setEditorState(JSON.parse(data));
        }
    }, [])

    useEffect(() => {
        console.log(editorState)
        localStorage.setItem("editor", JSON.stringify(editorState));
    }, [editor, editorState])

    const selectedSlide = editor.presentation.slides.find(
        slide => slide.id === editor.selection?.selectedSlideId
    ) || null;
    
    const isSelected = Boolean(selectedSlide);
    return (
        <>
            <TopPanel title={editor.presentation.title}></TopPanel> 
            <div className={styles.container}>
            <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={selectedSlide} 
                selectedElementId={editor.selection.selectedElementId}
                isSelected={isSelected}
                className={styles.workspace}>
                </Workspace>
            </div>
        </>
    )
}

export default App