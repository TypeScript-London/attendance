import {prisma} from './prisma';
import {createAPI, NextkitError} from 'nextkit';
import {redis} from './redis';
import {sessions, SEVEN_DAYS_IN_SECONDS} from './sessions';
import {pika} from './pika';
import * as argon from 'argon2';

export const api = createAPI({
	getContext: async req => ({
		redis,
		prisma,
		pika,

		hash: (password: string) => {
			return argon.hash(password);
		},

		verify: (hash: string, plain: string) => {
			return argon.verify(hash, plain);
		},

		sessions: {
			read: () => {
				if (!req.cookies.token) {
					throw new NextkitError(401, 'You are not signed in');
				}

				return sessions.read(req.cookies.token);
			},

			create: (id: string, ttl = SEVEN_DAYS_IN_SECONDS) => {
				return sessions.create(id, ttl);
			},
		},
	}),

	onError: async (req, res, error) => ({
		status: 500,
		message: error.message,
	}),
});
