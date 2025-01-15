import styles from './TopPanel.module.css'
import {ImageButton, TextgeButton} from "../../Button/Button.tsx";
import React, { useState, useRef } from 'react';
import { importFromFile } from '../../store/storage/jsonUtils.ts';
import { toBase64 } from '../../store/functions/converter.ts';
import { useDispatch } from 'react-redux';
import { addSlideAction, removeSlideAction, changeBackgroundAction, setColorAction } from '../../store/redux/actions/SlideActions.ts'
import { renamePresentationTitleAction } from '../../store/redux/actions/presentationActions.ts';
import { addImageAction, addTextAction , removeElementAction, changeColorAction, increaseSizeAction, decreaseSizeAction, changeFontFamilyAction } from '../../store/redux/actions/elementActions.ts';
import { importAction, redoAction, undoAction } from '../../store/redux/actions/editorActions.ts';
import { exportToFile } from '../../store/storage/jsonUtils.ts';
import { getEditor } from '../../store/functions/editor.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { generatePDF } from '../../store/functions/PDF/createPDF.ts';


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
import undo from '../../../icons/undo.png'
import redo from '../../../icons/redo.png'
import pdf from '../../../icons/pdf.png'


function TopPanel() {
    const [isActive, setIsActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const colorPicker = useRef<HTMLInputElement | null>(null);
    const imageFileRef = useRef<HTMLInputElement | null>(null);
    const [selectedColor, SetColor] = useState<string>("#FFFFFF");
    const presentationFile = useRef<HTMLInputElement | null>(null);
    const colorPallete = useRef<HTMLInputElement | null>(null);

    const appDispath = useDispatch();
    const editor = useAppSelector(state => state);
    const selectedSlide = editor.current.selection.selectedSlideId;
    const selectedElement = editor.current.selection.selectedElementId;
    const title = editor.current.presentation.title;


    const fonts = ["Arial", "Verdana", "Georgia", "Times New Roman", "Courier New"];


    function onChangeFontFamily(event: React.ChangeEvent<HTMLSelectElement>) {
        const newFontFamily = event.target.value;
        if (selectedSlide && selectedElement) {
          appDispath(changeFontFamilyAction(selectedSlide, selectedElement, newFontFamily));
        } else {
          alert("Выберите элемент для изменения шрифта.");
        }
      }

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
        appDispath(addTextAction())
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
        exportToFile(editor.current);
    }

    function activatePresentationFile(){
        if (presentationFile.current) {
            presentationFile.current.click();
        }
    }

    function handlerFileChange(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];
        if(file){
            importFromFile(file)
                .then((parseContent) => {
                    appDispath(importAction(parseContent))
                })
                .catch((error) => {
                    console.error('Error importing presentation:', error);
                    alert('Please check the file format.');
                })
                .finally(() => {
                    event.target.value = '';
                });  
        }
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

    function onUndo(){
        appDispath(undoAction());
    }
    
    function onRedo(){
        appDispath(redoAction());
    }

    function PDF(){
        appDispath(generatePDF(editor.current));
    }

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
                    <ImageButton className={styles.button} img={undo} onClick={onUndo}></ImageButton>
                    <ImageButton className={styles.button} img={redo} onClick={onRedo}></ImageButton>
                </div>
                <div className={styles.elementActions}>
                    <select className={styles.FontFamilySelector} onChange={onChangeFontFamily}>
                        {fonts.map((font) => (
                            <option key={font} value={font}>
                                {font}
                            </option>
                        ))}
                    </select>
                    <ImageButton className={styles.button} img={addTextIcon} onClick={onAddText}></ImageButton>
                    <ImageButton className={styles.button} img={increaseText} onClick={onIncreaseTextSize}></ImageButton>
                    <ImageButton className={styles.button} img={decreaseText} onClick={onDecreaseTextSize}></ImageButton>
                    <ImageButton className={styles.button} img={textColor} onClick={activateColorPalette}></ImageButton>
                    <input type="color" className={styles.colorPallete} ref={colorPallete} onChange={onTextColorChange}/>
                    <ImageButton className={styles.button} img={addImageIcon} onClick={activateImageFileInput}></ImageButton>
                    <input type="file" name="imageElemnt" id="imageElement" accept='.jpeg, .png, .jpg'  onChange={onAddImage} ref={imageFileRef} style={{display: 'none'}}/>
                    <ImageButton className={styles.button} img={removeSldieIcon} onClick={onRemoveElement}></ImageButton>
                </div>
                <div className={styles.presentationActions}>
                    <ImageButton className={styles.button} img={exportIcon} onClick={exportation}></ImageButton>
                    <ImageButton className={styles.button} img={importIcon} onClick={activatePresentationFile}></ImageButton>
                    <input type="file" name="presentationFile" ref={presentationFile} style={{display: 'none'}} onChange={handlerFileChange}/>
                    <ImageButton className={styles.button} img={pdf} onClick={PDF}></ImageButton>
                </div>
            </div>
        </div>
    )
}

export {
    TopPanel,
}