import styles from './Button.module.css'

type TextButtonProps = {
    text: string,
    onClick: () => void,
    className: string,
}

type ImgButtonProps = {
    img: string,
    onClick: () => void,
    className: string,
}

function ImageButton({img, onClick, className}: ImgButtonProps) {
    return (
        <img className={`${styles.imgButton} ${className}`} src={img}  onClick={onClick}></img>
    )
}

function TextgeButton({text, onClick, className}: TextButtonProps) {
    return (
        <button className={`${styles.textButton} ${className}`} onClick={onClick}>{text}</button>
    )
}

export {
    ImageButton,
    TextgeButton,
}