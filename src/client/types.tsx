import {StaticImageData} from 'next/image';
import {ReactNode} from 'react';

export interface Speaker {
	image: StaticImageData;
	name: string;
	description: ReactNode;

	presentation?: {
		title: string;
		description: ReactNode;
		youtube?: string;
	};
}
