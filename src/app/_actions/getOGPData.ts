'use server';

import { parse } from 'node-html-parser';

export type OGPData = {
	title?: string;
	description?: string;
	image?: string;
	url: string;
};

export const getOGPData = async (url: string) => {
	const response = await fetch(url, { cache: 'no-store' });
	if (!response.ok)
		throw new Error(`🔥 Failed to fetch HTML: ${response.statusText}`);

	try {
		const html = await response.text();
		const ogpData = extractOGPData(html, url);
		return ogpData;
	} catch (error) {
		console.error('🔥 Error fetching or parsing OGP data:', error);
		throw error;
	}
};

const extractOGPData = (html: string, url: string) => {
	const root = parse(html);

	const getMetaContent = (property: string) =>
		root.querySelector(`meta[property="${property}"]`)?.getAttribute('content');

	// TODO: og titleとか無い場合、site titleなどを取得するなど
	const ogpData: OGPData = {
		title: getMetaContent('og:title'),
		description: getMetaContent('og:description'),
		image: getMetaContent('og:image'),
		url,
	};

	return ogpData;
};
