import { PDFDocument } from "pdf-lib";

async function fromStringToPDFImage(image: string, pdfDoc: PDFDocument) {
    const base64Data = image.split(',')[1];
    const sanitizedBase64Data = base64Data.replace(/[\s)(]+.*$/, '');
    let pdfImage;
    if (image.startsWith('url(data:image/png') || image.startsWith('data:image/png')) {
      pdfImage = await pdfDoc.embedPng(sanitizedBase64Data);
    } else if (
      image.startsWith('url(data:image/jpeg') ||
      image.startsWith('url(data:image/jpg') ||
      image.startsWith('data:image/jpeg') ||
      image.startsWith('data:image/jpg')
    ) {
      pdfImage = await pdfDoc.embedJpg(sanitizedBase64Data);
    }
    return pdfImage;
  }

  export { fromStringToPDFImage}