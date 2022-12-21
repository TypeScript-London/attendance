import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import {AppProps} from 'next/app';
import Head from 'next/head';

export default function App({Component, pageProps}: AppProps) {
	return (
		<>
			<Head>
				<title>TypeScript London</title>
			</Head>

			<Component {...pageProps} />
		</>
	);
}
