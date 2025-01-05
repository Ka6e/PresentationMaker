    import styles from './TopPanel.module.css'
    import {Button} from "../../Button/Button.tsx";
    import {dispatch, getEditor} from "../../store/editor.ts";
    import {removeSlide} from "../../store/removeSlide.ts";
    import { addSlide } from '../../store/addSlide.ts';
    import { useState, useRef } from 'react';
    import { deleteElement } from '../../store/removeElement.ts'
    import { addImage, addText, newText } from '../../store/addElement.ts';
    import { setColor, setImage } from '../../store/changeBackground.ts';
    import { TitleChange } from '../../store/renameTitle.ts';
    import { exportToFile, importFromFile } from '../../store/localeStorage/jsonUtils.ts';
import { toBase64 } from '../../store/converter.ts';


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


        function onAddSlide() {
            dispatch(addSlide)
        }
        function onRemoveSlide() {
            dispatch(removeSlide)
        }

        function onAddText() {
            dispatch(addText, newText);
        }
        
        async function onAddImage(event: React.ChangeEvent<HTMLInputElement>){
            const file = event.target.files?.[0]; 
            if (file) {
                const base64 = await toBase64(file); 
                dispatch(addImage, base64); 
                console.log("Selected file URL:", base64);
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

        async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
            const file = event.target.files?.[0];
            if (file) {
                const fullPath = await toBase64(file); 
                console.log("Selected file:", fullPath);
                dispatch(setImage, fullPath);
            }
        }

        function exportation(){
            const editor = getEditor();
            exportToFile(editor);
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
                .then((editorData) => {
                    dispatch(() => (editorData));
                })
                .catch((error) => {
                    console.error("Ошибка импорта:", error);
                alert("Не удалось загрузить файл");

                });
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
                    <input type="file" name="imageElemnt" id="imageElement" accept='.jpeg, .png, .jpg'  onChange={onAddImage} ref={imageFileRef} style={{display: 'none'}}/>
                    <Button className={styles.button} text={'Remove Element'} onClick={onRemoveElement}></Button>
                    <Button className={`${styles.button} ${isActive ? styles['button--active']: ''}` } text={'Change Slide Color'} onClick={activateColorPalette}></Button>
                    <input type="color" className={styles.colorPicker} id="colorPicker" value={selectedColor} ref={colorPicker} onChange={onColorChange} />
                    {isActive && (
                        <Button className={styles.button} text={'Apply'} onClick={applyColor}></Button>
                    )}
                    <Button className={styles.button} text={'Change Background Image'} onClick={activateFileInput}></Button>
                    <input type="file" name="image" id="image" accept='.jpeg, .png, .jpg' onChange={onFileChange} ref={fileInputRef} style={{display: 'none'}}/>
                    <Button className={styles.button} text={'Export presentation'} onClick={exportation}></Button>
                    <Button className={styles.button} text={'Import presentation'} onClick={activatePresentationFile}></Button>
                    <input type="file" name="presentationFile" ref={presentationFile} style={{display: 'none'}} onChange={handlerFileChange}/>
                </div>
            </div>
        )
    }

    export {
        TopPanel,
    }