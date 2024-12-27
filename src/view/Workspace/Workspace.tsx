import {SlideType} from "../../store/PresentationType.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'

type WorkspaceProps = {
    slide: SlideType | null,
    isSelected: boolean,
    className: string,
    selectedElementId: string | null,
}

function Workspace({slide, selectedElementId}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            {slide ?(
                <Slide slide={slide} isSelected={false} className={styles.slide} selectedElementId={selectedElementId}></Slide>
            ): (
                <div className={styles.none}/>
            )}
        </div>
    );
}

export {
    Workspace,
}