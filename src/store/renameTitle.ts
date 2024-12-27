import { dispatch } from "./editor.ts";
import {EditorType} from "./EditorType.ts";


function TitleChange(event: React.FocusEvent<HTMLInputElement>) {
  if (!event.target.value.trim()) {
    event.target.value = "Новая презентация";
     dispatch(renamePresentationTitle, "Новая презентация");
  } else {
     dispatch(renamePresentationTitle, event.target.value);
  }
  function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
    if (!newTitle.trim()) {
      return {
        ...editor,
        presentation: {
           ...editor.presentation,
           title: "Новая презентация",
        }
      }
    } else {
      return {
        ...editor,
        presentation: {
           ...editor.presentation,
           title: newTitle,
        }
        }
    }
  }
}

export {
  TitleChange,
}