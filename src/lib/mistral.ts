import { Mistral } from '@mistralai/mistralai';

export const createMistralClient = () => {
	const apiKey = process.env.MISTRAL_API_KEY;
	if (!apiKey) {
		throw new Error('MISTRAL_API_KEY is not set in environment variables');
	}

	const mistral = new Mistral({ apiKey });
	return { mistral };
};
