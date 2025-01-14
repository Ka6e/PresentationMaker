import { EditorType } from "../functions/EditorType";
import { validate } from "./validation";

function exportToFile(editor: EditorType): void{
        const dataStr = JSON.stringify(editor, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const linkElem = document.createElement('a');
        const url = URL.createObjectURL(blob);
        linkElem.setAttribute('href', url);
        linkElem.setAttribute('download', 'presentation.json');
        linkElem.click();
        URL.revokeObjectURL(url);
}

const importFromFile = (file: File): Promise<EditorType> => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const content = e.target?.result as string;
              const parsedContent = JSON.parse(content) as EditorType;

              if (!validate(parsedContent)) {
                  throw new Error('Invalid presentation format');
              }
              
              resolve(parsedContent);
          } catch (err) {
              reject(err)
          }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
  });
}

export {
    exportToFile,
    importFromFile,
}