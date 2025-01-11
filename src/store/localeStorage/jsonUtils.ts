import { EditorType } from "../EditorType";
import { validate } from "./validation";

function exportToFile(editor: EditorType): void{
        const dataStr = JSON.stringify(editor, null, 2);
    
        // Создаем новый объект Blob с типом MIME application/json
        const blob = new Blob([dataStr], { type: 'application/json' });
        
        // Создаем ссылку для загрузки файла
        const linkElem = document.createElement('a');
        
        // Создаем объект URL для Blob, чтобы использовать его в href
        const url = URL.createObjectURL(blob);
        
        // Устанавливаем атрибуты ссылки для скачивания
        linkElem.setAttribute('href', url);
        linkElem.setAttribute('download', 'presentation.json');
        
        // Программно кликаем по ссылке для скачивания файла
        linkElem.click();
        
        // Очищаем URL после использования
        URL.revokeObjectURL(url);
}

function importFromFile(file: File): Promise<EditorType>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const content = reader.result as string;
                const editor = JSON.parse(content);
                resolve(editor);  // Возвращаем данные
            } catch (error) {
                reject('Ошибка при чтении файла: ' + error);  // Если ошибка
            }
        };

        reader.onerror = () => {
            reject('Ошибка при загрузке файла');
        };

        reader.readAsText(file);
    });
}

export function importEditor(editor: EditorType, jsonString: string): EditorType {

    if (typeof jsonString === 'string') {
      try {
        const importedState: EditorType = JSON.parse(jsonString);
        if (validate(importedState)) {
          console.log('Импортирован и прошел валидацию:', importedState);
          return importedState;
        } else {
          alert('editor state не прошел валидацию.');
          console.  error(validate.errors);
          return editor;
        }
      } catch (error) {
        console.error('Ошибка при парсинге JSON:', error);
        return editor;
      }
    } else { return editor }
  
  }

export {
    exportToFile,
    importFromFile,
}