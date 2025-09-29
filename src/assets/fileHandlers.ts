import type { FormValues } from '@/components/formSchema';

const createFile = (values: FormValues) => {
	return new Blob([JSON.stringify(values)], { type: 'application/json' });
};

const createLinkForDownloading = (url: string) => {
	const downloadLink = document.createElement('a');
	downloadLink.href = url;
	downloadLink.download = 'result.json';

	document.body.appendChild(downloadLink);
	downloadLink.click();

	downloadLink.remove();
};

export const downloadFile = (values: FormValues) => {
	const blob = createFile(values);
	const fileURL = URL.createObjectURL(blob);

	createLinkForDownloading(fileURL);
	URL.revokeObjectURL(fileURL);
};

export const readImportedFile = async (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onerror = () => {
			reject(new Error('Error during reading files'));
		};

		reader.onload = () => {
			resolve(JSON.parse(reader.result as string));
		};
	});
};
