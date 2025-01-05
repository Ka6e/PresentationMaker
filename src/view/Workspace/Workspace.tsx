import {SlideType} from "../../store/PresentationType.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'

type WorkspaceProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

function Workspace({slide, selectedElementId}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            {slide ?(
                <Slide slide={slide} isSelected={false} className={""} selectedElementId={selectedElementId}></Slide>
            ): (
                <div className={styles.none}/>
            )}
        </div>
    );
}

export {
    Workspace,
}