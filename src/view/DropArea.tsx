import {useState} from 'react'
import styles from './DropArea.module.css'

const DropArea = () => {
    const [showDrop, setShowDrop] = useState(false);
    return <p 
        className={showDrop ? styles.drop_area : styles.hide_drop}
        onDragEnter={() => setShowDrop(true)}
        onDragLeave={() => setShowDrop(false)}
        onDrop={() => setShowDrop(false)}
        // onDrop={() => {
        //     onDrop();
        //     setShowDrop(false);
        // }}
    >drop here</p>
};

export default DropArea;