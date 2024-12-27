import { EditorType } from "./EditorType";

function deleteElement(editor: EditorType): EditorType {
	console.log('editor', editor);
	
	if (!editor.selection) {
	  return editor;
	}
 
	const removeElementId = editor.selection.selectedElementId;
	const newSlides = editor.presentation.slides.map(slide => {
		const newObjects = slide.objects.filter(element => element.id !== removeElementId);

	  if (newObjects.length !== slide.objects.length) {
		 return { ...slide, objects: newObjects };
	  }
	  
	  return slide;
	});
 
	return {
	  ...editor,
	  presentation: {
		 ...editor.presentation,
		 slides: newSlides,
	  },
      selection: {
        selectedElementId: null,
        selectedSlideId: editor.selection.selectedSlideId
      }
	};
 }

 export {
	deleteElement,
 }
