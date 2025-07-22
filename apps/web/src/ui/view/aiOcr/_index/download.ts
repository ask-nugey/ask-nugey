"use client";

import type { OCRResponse } from "@mistralai/mistralai/src/models/components/ocrresponse.js";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadAsZip = async (
	ocrResult: OCRResponse,
	fileName = "ocr-export",
	markdownOnly = false
) => {
	// Argument validation
	if (!ocrResult || !ocrResult.pages || ocrResult.pages.length === 0) {
		throw new Error("No valid OCR results available");
	}

	try {
		// Markdown file combining all pages
		let allMarkdown = "";

		// Loop through each page to combine markdown
		for (const page of ocrResult.pages) {
			// Add page's markdown
			if (page.markdown) {
				// Add to the combined markdown
				allMarkdown += `${page.markdown}\n\n`;
			}
		}

		// If downloading markdown only
		if (markdownOnly) {
			const blob = new Blob([allMarkdown], {
				type: "text/markdown;charset=utf-8",
			});
			saveAs(blob, `${fileName}.md`);
			return Promise.resolve();
		}

		// Process for combining markdown and images into a ZIP
		// Create JSZip instance
		const zip = new JSZip();

		// Loop through each page to add markdown and images
		for (const page of ocrResult.pages) {
			// Add images included in the page to the ZIP
			if (page.images && page.images.length > 0) {
				for (const image of page.images) {
					if (image.imageBase64) {
						try {
							// Extract Base64 data
							let base64Data = image.imageBase64;
							let contentType = "image/png"; // Default

							// Extract Base64 part and MIME type directly from data URL
							if (base64Data.startsWith("data:")) {
								const parts = base64Data.split(",");
								const matches = parts[0].match(/^data:(.+);base64$/);
								if (matches && matches.length > 1) {
									contentType = matches[1];
									base64Data = parts[1];
								}
							}

							// Determine image extension
							const extension = getExtensionFromMimeType(contentType);

							// Convert to binary data
							const binaryData = atob(base64Data);
							const bytes = new Uint8Array(binaryData.length);
							for (let i = 0; i < binaryData.length; i++) {
								bytes[i] = binaryData.charCodeAt(i);
							}

							// Use image ID as filename (or random string if ID is not available)
							const imageFileName =
								image.id ||
								`image-${Math.random().toString(36).substring(2, 10)}${extension}`;
							zip.file(imageFileName, bytes.buffer, { binary: true });
						} catch (error) {
							console.error(`Image processing error: ${error}`);
						}
					}
				}
			}
		}

		// Add the combined markdown of all pages to the ZIP
		zip.file("main.md", allMarkdown);

		// Generate ZIP file
		const zipBlob = await zip.generateAsync({ type: "blob" });

		// Download ZIP file
		saveAs(zipBlob, `${fileName}.zip`);

		return Promise.resolve();
	} catch (error) {
		console.error("Error occurred while generating ZIP file:", error);
		return Promise.reject(error);
	}
};

const getExtensionFromMimeType = (mimeType: string) => {
	const mimeToExt: { [key: string]: string } = {
		"image/jpeg": ".jpg",
		"image/jpg": ".jpg",
		"image/png": ".png",
	};

	return mimeToExt[mimeType] || ".png"; // Default is PNG
};
