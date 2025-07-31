"use server";

import type {
	Document,
	FilePurpose,
} from "@mistralai/mistralai/models/components";

import { createMistralClient } from "@/src/lib/mistral";
import { getFileType } from "@/src/ui/view/aiOcr/_index/utils";

const { mistral } = createMistralClient();

export const getOcrPages = async (formData: FormData) => {
	const file = formData.get("file");

	if (!file || !(file instanceof Blob)) {
		throw new Error("Invalid file: ファイルが取得できませんでした。");
	}

	const uploaded_pdf = await mistral.files.upload({
		file: {
			fileName: file.name,
			content: file,
		},
		// NOTE: 型にはないがこれが正しい
		// https://docs.mistral.ai/capabilities/document/
		purpose: "ocr" as FilePurpose,
	});

	const signedUrl = await mistral.files.getSignedUrl({
		fileId: uploaded_pdf.id,
	});

	const document = ((): Document | undefined => {
		if (getFileType(file) === "pdf") {
			return {
				type: "document_url",
				documentUrl: signedUrl.url,
			};
		}

		if (getFileType(file) === "image") {
			return {
				type: "image_url",
				imageUrl: signedUrl.url,
			};
		}
	})();

	if (!document) return;

	try {
		const ocrResponse = await mistral.ocr.process({
			model: "mistral-ocr-latest",
			document,
			includeImageBase64: true,
		});

		return { ocrPages: ocrResponse.pages };
	} catch (error) {
		console.error("Error occurred during OCR processing:", error);
		throw error;
	}
};
