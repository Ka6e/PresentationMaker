import { EditorType } from '../../../store/functions/EditorType.ts';
import { PDFDocument, rgb, PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { AppThunk } from '../../storage/store.ts';
import { showPDFModal } from './showPdf.ts';
import { parseColor } from './parseColor.ts';
import { fromStringToPDFImage } from './imageConvertor.ts';


export const generatePDF = (editor: EditorType): AppThunk => {
    const sizeSlide ={
        width: 935,
        height: 525,
    } 
  return async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const fontCache: Record<string, PDFFont> = {};
    async function getFont(fontFamily: string) {
      if (!fontCache[fontFamily]) {
        try {
          const fontPath = `../../../fonts/${fontFamily}.ttf`;
          const fontBytes = await fetch(fontPath).then((res) => res.arrayBuffer());
          fontCache[fontFamily] = await pdfDoc.embedFont(fontBytes);
        } catch (error) {
          console.error(`Не удалось загрузить шрифт ${fontFamily}:`, error);
          alert(`Шрифт ${fontFamily} недоступен. Используется шрифт по умолчанию.`);
          fontCache[fontFamily] = font;
        }
      }
      return fontCache[fontFamily];
    }

    const defaultFontBytes = await fetch('../../../fonts/Arial.ttf').then((res) =>
      res.arrayBuffer()
    );
    const font = await pdfDoc.embedFont(defaultFontBytes);

    for (let index = 0; index < editor.presentation.slides.length; index++) {
      const slide = editor.presentation.slides[index];
      const page = pdfDoc.addPage([sizeSlide.width, sizeSlide.height]);

      if (slide.background.type === "img") {
        const imageSrc = slide.background.src;
        if (imageSrc.startsWith("data:image")) {
          const image = await fromStringToPDFImage(imageSrc, pdfDoc);
          if (image) {
            page.drawImage(image, {
              x: 0,
              y: 0,
              width: sizeSlide.width,
              height: sizeSlide.height,
            });
          }
        } else if (imageSrc.startsWith("http")) {
          const imageBytes = await fetch(imageSrc).then((res) => res.arrayBuffer());
          let image;
          if (imageSrc.endsWith(".png")) {
            image = await pdfDoc.embedPng(imageBytes);
          } else if (imageSrc.endsWith(".jpg") || imageSrc.endsWith(".jpeg")) {
            image = await pdfDoc.embedJpg(imageBytes);
          }
          if (image) {
            page.drawImage(image, {
              x: 0,
              y: 0,
              width: sizeSlide.width,
              height: sizeSlide.height,
            });
          }
        }
      } else if (slide.background.type === "solid") {
        const color = parseColor(slide.background.color)[0];
        const [r, g, b] = color;
        page.drawRectangle({
          x: 0,
          y: 0,
          width: sizeSlide.width,
          height: sizeSlide.height,
          color: rgb(r / 255, g / 255, b / 255),
        });
      }

      for (const element of slide.objects) {
        try {
          if (element.type === 'text') {
            const textObj = element;

            const elementFont = textObj.fontFamily
              ? await getFont(textObj.fontFamily)
              : font;

            const textColorArray = parseColor(textObj.color || '#000000')[0];
            const [r, g, b] = textColorArray;

            page.drawText(textObj.value, {
              x: textObj.x,
              y: sizeSlide.height - textObj.y,
              size: textObj.fontSize,
              font: elementFont,
              color: rgb(r / 255, g / 255, b / 255),
              maxWidth: textObj.width,
            });
          } else if (element.type === 'image') {
            const imgObj = element;
            const image = await fromStringToPDFImage(element.src, pdfDoc);

            if (image) {
              page.drawImage(image, {
                x: imgObj.x,
                y: sizeSlide.height - imgObj.y - imgObj.height,
                width: imgObj.width,
                height: imgObj.height,
              });
            }
          }
        } catch (err) {
          console.error(`Error rendering element on slide ${index + 1}:`, err);
          alert(`Произошла ошибка при добавлении элемента на слайде ${index + 1}`);
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfURL = URL.createObjectURL(pdfBlob);

    showPDFModal(pdfURL, editor.presentation.title || 'Presentation');
  };
};