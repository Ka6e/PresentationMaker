// import { useDispatch } from "react-redux";
// import { dispatch } from "./editor.ts";
// import {EditorType} from "./EditorType.ts";
// import { useSelector } from "react-redux";
// import { renamePresentationTitleAction } from "./redux/actions/presentationActions.ts";

// function TitleChange(event: React.FocusEvent<HTMLInputElement>) {
//   const appDispatch = useDispatch();

//   const newTitle = event.target.value.trim() || "Новая презентация";

//   appDispatch(renamePresentationTitleAction(newTitle));
// }

// function TitleChange(event: React.FocusEvent<HTMLInputElement>) {
//   const appDispatch = useDispatch();
//   const title = useSelector((state: EditorType) => state.presentation.title);
//   if (!event.target.value.trim()) {
//     event.target.value = "Новая презентация";
//      appDispatch(renamePresentationTitleAction("Новая презентация"));
//   } else {
//     appDispatch(renamePresentationTitleAction(event.target.value));
//   }
//   function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
//     if (!newTitle.trim()) {
//       return {
//         ...editor,
//         presentation: {
//            ...editor.presentation,
//            title: "Новая презентация",
//         }
//       }
//     } else {
//       return {
//         ...editor,
//         presentation: {
//            ...editor.presentation,
//            title: newTitle,
//         }
//         }
//     }
//   }
// }

// export {
//   TitleChange,
// }