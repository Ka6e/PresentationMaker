import styles from './App.module.css'
import {SlidesList} from "./view/slideList/SlideList.tsx";
import {TopPanel} from "./view//TopPanel/TopPanel.tsx";
import {Workspace} from "./view/Workspace/Workspace.tsx";
import {EditorType} from "./store/EditorType.ts";
// import { useEffect, useState } from 'react';



type AppProps = {
    editor: EditorType,
}
function App({editor}: AppProps) {
    return (
        <>
            <TopPanel title={editor.presentation.title}></TopPanel> 
            <div className={styles.container}>
            <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace 
                    slide={editor.presentation.slides.find(slide => slide.id === editor.selection.selectedSlideId) || null}
                    selectedElementId={editor.selection.selectedElementId}>
                </Workspace>
            </div>
        </>
    )
}

export default App