import {Pika, InferPrefixes} from 'pika-id';
import {z} from 'zod';

export const pika = new Pika([
	'user',
	'event',
	'attendance',

	{prefix: 'session', secure: true},
]);

export type IdPrefixes = InferPrefixes<typeof pika>;

export function id<P extends IdPrefixes>(prefix: P) {
	return z
		.string()
		.refine((value): value is `${P}_${string}` => pika.validate(value, prefix));
}
