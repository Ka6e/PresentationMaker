import styles from './TopPanel.module.css'
import { useSelector } from 'react-redux';
import { EditorType } from '../../store/EditorType.ts';
import {ImageButton, TextgeButton} from "../../Button/Button.tsx";
import React, { useState, useRef } from 'react';
import { newText } from '../../store/addElement.ts';
import { exportAсtion } from '../../store/redux/actions/editorActions.ts';
import { importPresentationFromFile } from '../../store/redux/actions/editorActions.ts';
import { importFromFile } from '../../store/localeStorage/jsonUtils.ts';
import { toBase64 } from '../../store/converter.ts';
import { useDispatch } from 'react-redux';
import { addSlideAction, removeSlideAction, changeBackgroundAction, setColorAction } from '../../store/redux/actions/SlideActions.ts'
import { renamePresentationTitleAction } from '../../store/redux/actions/presentationActions.ts';
import { addImageAction,addTextAction , removeElementAction, changeColorAction, increaseSizeAction, decreaseSizeAction } from '../../store/redux/actions/elementActions.ts';
import { importAction } from '../../store/redux/actions/editorActions.ts';
import { TextObjectType} from '../../store/PresentationType.ts'


import addSlideIcon from '../../../icons/multiple.png'
import removeSldieIcon from '../../../icons/delete-symbol.png'
import addTextIcon from '../../../icons/file.png'
import addImageIcon from '../../../icons/image.png'
import changeSlideColorIcon from '../../../icons/pallete.png'
import importIcon from "../../../icons/import.png"
import exportIcon from '../../../icons/export.png'
import textColor from '../../../icons/textColor.png'
import increaseText from '../../../icons/increaseSize.png'
import decreaseText from '../../../icons/decreaseSize.png'


type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {
    const [isActive, setIsActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const colorPicker = useRef<HTMLInputElement | null>(null);
    const imageFileRef = useRef<HTMLInputElement | null>(null);
    const [selectedColor, SetColor] = useState<string>("#FFFFFF");
    const presentationFile = useRef<HTMLInputElement | null>(null);
    const colorPallete = useRef<HTMLInputElement | null>(null);
    // const [isText, setIsText] = useState(false);

    const appDispath = useDispatch();
    const selectedSlide = useSelector((state: EditorType) => state.selection.selectedSlideId);
    const selectedElement = useSelector((state: EditorType) => state.selection.selectedElementId);


    function TitleChange(event: React.FocusEvent<HTMLInputElement>) {
      
        const newTitle = event.target.value.trim() || "Новая презентация";
      
        appDispath(renamePresentationTitleAction(newTitle));
      }
      
    function onAddSlide() {
        appDispath(addSlideAction())
    }
    function onRemoveSlide() {
        appDispath(removeSlideAction())
    }

    function onAddText() {
        appDispath(addTextAction(newText));
    }
    
    async function onAddImage(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0]; 
        if (file) {
            const base64 = await toBase64(file); 
            appDispath(addImageAction(base64)); 
            console.log("Selected file URL:", base64);
        }
    }

    function onRemoveElement() {
        appDispath(removeElementAction());
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

    function activateColorPicker(){
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
        appDispath(setColorAction(selectedColor));
        setIsActive(!isActive);
    }

    async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const fullPath = await toBase64(file); 
            console.log("Selected file:", fullPath);
            appDispath(changeBackgroundAction(fullPath));
        }
    }

    function exportation(){
        appDispath(exportAсtion());
    }

    function activatePresentationFile(){
        if (presentationFile.current) {
            presentationFile.current.click();
        }
    }

    function onImportEditorState() {

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
    
    
        fileInput.addEventListener('change', () => {
          const file = fileInput.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const jsonString = reader.result as string;
                appDispath(importAction(jsonString));
    
              } catch (error) {
                alert('Ошибка при импорте: некорректный JSON файл.');
                console.error('Error during import:', error);
              }
            };
            reader.onerror = () => {
              alert('Ошибка чтения файла.');
              console.error('FileReader error:', reader.error);
            };
            reader.readAsText(file);
          }
        });
    
        fileInput.click();
    }

    function activateColorPalette() {
        if(colorPallete.current){
            colorPallete.current.click();
        }
    }

    function onTextColorChange(event: React.ChangeEvent<HTMLInputElement>){
        const newColor = event.target.value;
        appDispath(changeColorAction(selectedSlide, selectedElement, newColor));
    }

    function onIncreaseTextSize(){
        appDispath(increaseSizeAction(selectedSlide, selectedElement));
    }

    function onDecreaseTextSize(){
        appDispath(decreaseSizeAction(selectedSlide, selectedElement));
    }
    // async function handlerFileChange(event: React.ChangeEvent<HTMLInputElement>){
    //     const file = event.target.files?.[0];
    //     if(file){
    //       appDispath(importPresentationAction(file));
    //     }
    //     // if(file){
    //     //     importFromFile(file)
    //     //     .then((editorData) => {
    //     //         dispatch(() => (editorData));
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error("Ошибка импорта:", error);
    //     //     alert("Не удалось загрузить файл");

    //     //     });
    //     // }
    // }

    return (
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" maxLength={30} defaultValue={title} onBlur={TitleChange}/>
            <div className={styles.buttons}>
                <div className={styles.slidesActions}>
                    <ImageButton className={styles.button} img={addSlideIcon} onClick={onAddSlide}></ImageButton>
                    <ImageButton className={styles.button} img={removeSldieIcon} onClick={onRemoveSlide}></ImageButton>
                    <ImageButton className={styles.button} img={addImageIcon} onClick={activateFileInput} ></ImageButton>
                    <ImageButton className={`${styles.button} ${isActive ? styles['button--active']: ''}` } img={changeSlideColorIcon} onClick={activateColorPicker}></ImageButton>
                    <input type="file" name="image" id="image" accept='.jpeg, .png, .jpg' onChange={onFileChange} ref={fileInputRef} style={{display: 'none'}}/>
                    <input type="color" className={styles.colorPicker} id="colorPicker" value={selectedColor} ref={colorPicker} onChange={onColorChange} />
                    {isActive && (
                            <TextgeButton className={styles.apply} text={'Apply'} onClick={applyColor}></TextgeButton>
                    )}
                </div>
                <div className={styles.elementActions}>
                    <ImageButton className={styles.button} img={addTextIcon} onClick={onAddText}></ImageButton>
                    <ImageButton className={styles.button} img={increaseText} onClick={onIncreaseTextSize}></ImageButton>
                    <ImageButton className={styles.button} img={decreaseText} onClick={onDecreaseTextSize}></ImageButton>
                    <ImageButton className={styles.button} img={textColor} onClick={activateColorPalette}></ImageButton>
                    <input type="color" className={styles.colorPallete} ref={colorPallete} onChange={onTextColorChange}/>
                    <ImageButton className={styles.button} img={addImageIcon} onClick={activateImageFileInput}></ImageButton>
                    <ImageButton className={styles.button} img={removeSldieIcon} onClick={onRemoveElement}></ImageButton>
                </div>
                <div className={styles.presentationActions}>
                    <ImageButton className={styles.button} img={exportIcon} onClick={exportation}></ImageButton>
                    <ImageButton className={styles.button} img={importIcon} onClick={onImportEditorState}></ImageButton>
                    <input type="file" name="imageElemnt" id="imageElement" accept='.jpeg, .png, .jpg'  onChange={onAddImage} ref={imageFileRef} style={{display: 'none'}}/>
                </div>
                {/* <input type="file" name="presentationFile" ref={presentationFile} style={{display: 'none'}} onChange={onImportEditorState}/> */}
            </div>
        </div>
    )
}

export {
    TopPanel,
}