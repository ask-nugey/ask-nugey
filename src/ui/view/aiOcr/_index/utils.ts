export const getFileType = (file?: File) => {
	if (!file) return;

	if (file.type === 'application/pdf') return 'pdf';

	const imageTypes = ['image/jpeg', 'image/jpeg', 'image/png'];
	if (imageTypes.includes(file.type)) return 'image';
};
