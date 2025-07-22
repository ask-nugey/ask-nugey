import Script from "next/script";

import { GOOGLE_ADSENSE_ID } from "@/src/constants";

export const GoogleAdScript = () => {
	if (process.env.ENV !== "production") return null;

	return (
		<Script
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${GOOGLE_ADSENSE_ID}`}
			crossOrigin="anonymous"
			strategy="afterInteractive"
		/>
	);
};
