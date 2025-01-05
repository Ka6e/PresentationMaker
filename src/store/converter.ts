const toBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
   });
};

export {
    toBase64,
}