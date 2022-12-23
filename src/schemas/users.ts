import {z} from 'zod';

export const email = z
	.string()
	.email()
	.transform(value => value.toLowerCase());

export const password = z
	.string()
	.min(6, 'Password must be at least 6 characters');
