import styles from './TopPanel.module.css'
import {Button} from "../../Button/Button.tsx";
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import { addSlide } from '../../store/addSlide.ts';
import { useState, useRef } from 'react';
import { deleteElement } from '../../store/removeElement.ts'
import { addImage, addText, newText } from '../../store/addElement.ts';
import { setColor, setImage } from '../../store/changeBackground.ts';
import { TitleChange } from '../../store/renameTitle.ts';


type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {
    const [isActive, setIsActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const colorPicker = useRef<HTMLInputElement | null>(null);
    const imageFileRef = useRef<HTMLInputElement | null>(null);
    const [selectedColor, SetColor] = useState<string>("#FFFFFF");


    function onAddSlide() {
        dispatch(addSlide)
    }
    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onAddText() {
        dispatch(addText, newText);
    }
    
    function onAddImage(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0]; 
        if (file) {
            const fileURL = URL.createObjectURL(file); 
            dispatch(addImage, fileURL); 
            console.log("Selected file URL:", fileURL);
        }
    }

    function onRemoveElement() {
        dispatch(deleteElement);
    }
    
    function activateFileInput(){
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    function activateImageFileInput(){
        if(imageFileRef.current){
            imageFileRef.current.click();
        }
    }

    function activateColorPalette(){
        if(colorPicker.current){
            colorPicker.current.click();
        }
        setIsActive(!isActive);
    }

    function onColorChange(event: React.ChangeEvent<HTMLInputElement>){
        const color = event.target.value;
        SetColor(color);
    }

    function applyColor(){
        dispatch(setColor, selectedColor);
        setIsActive(!isActive);
    }

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const fullPath = URL.createObjectURL(file); 
            console.log("Selected file:", file.name);
            dispatch(setImage, fullPath);
            event.target.value = '';
        }
    }

    return (
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" maxLength={30} defaultValue={title} onBlur={TitleChange}/>
            <div className={styles.buttons}>
                <Button className={styles.button} text={'Add Slide'} onClick={onAddSlide}></Button>
                <Button className={styles.button} text={'Remove Slide'} onClick={onRemoveSlide}></Button>
                <Button className={styles.button} text={'Add Text'} onClick={onAddText}></Button>
                <Button className={styles.button} text={'Add Image'} onClick={activateImageFileInput}></Button>
                <input type="file" name="imageElemnt" id="imageElement" accept='.jpeg, .pbg, .jpg'  onChange={onAddImage} ref={imageFileRef} style={{display: 'none'}}/>
                <Button className={styles.button} text={'Remove Element'} onClick={onRemoveElement}></Button>
                <Button className={`${styles.button} ${isActive ? styles['button--active']: ''}` } text={'Change Slide Color'} onClick={activateColorPalette}></Button>
                <input type="color" className={styles.colorPicker} id="colorPicker" value={selectedColor} ref={colorPicker} onChange={onColorChange} />
                {isActive && (
                    <Button className={styles.button} text={'Apply'} onClick={applyColor}></Button>
                )}
                <Button className={styles.button} text={'Change Background Image'} onClick={activateFileInput}></Button>
                <input type="file" name="image" id="image" accept='.jpeg, .png, .jpg' onChange={onFileChange} ref={fileInputRef} style={{display: 'none'}}/>
            </div>
        </div>
    )
}

export {
    TopPanel,
}