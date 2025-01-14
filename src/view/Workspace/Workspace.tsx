import { useEffect } from "react";
import { SlideType} from "../../store/functions/PresentationType.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'
import { useDispatch } from "react-redux";
import { redoAction, undoAction } from "../../store/redux/actions/editorActions.ts";


function Workspace() {

    const appDispatch = useDispatch();
    const edditor = useAppSelector(state => state);
    const slides = edditor.current.presentation.slides;
    const selectiion = edditor.current.selection;
    const selectedSlide: SlideType = slides.find(s => s.id === selectiion?.selectedSlideId) || slides[0];
    const selectedElement = selectiion.selectedElementId || null;


    useEffect(() => {
        const handeKeyDown = (e: KeyboardEvent) => {
            const undoKeys = new Set(['z', 'Z', 'я', 'Я']);
            const redoKeys = new Set(['y', 'Y', 'н', 'Н']);
            const isUndo = (e.ctrlKey || e.metaKey) && undoKeys.has(e.key);
            const isRedo = (e.ctrlKey || e.metaKey) && redoKeys.has(e.key);

            if(isUndo){
                e.preventDefault();
                appDispatch(undoAction());
            } else if (isRedo){
                e.preventDefault();
                appDispatch(redoAction());
            }
        };

        document.addEventListener('keydown', handeKeyDown);

        return () => {
            document.removeEventListener('keydown', handeKeyDown);
        };
    }, [appDispatch])
    return (
        <div className={styles.workspace}>
            {selectedSlide ?(
                <Slide slide={selectedSlide} isSelected={false} className={""} selectedElementId={selectedElement}></Slide>
            ): (
                <div className={styles.none}/>
            )}
        </div>
    );
}

export {
    Workspace,
}