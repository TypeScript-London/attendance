import {randomBytes} from 'crypto';
import {NextkitError} from 'nextkit';
import {redis, RedisKeys} from './redis';

export const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

export const sessions = {
	async read(token: string) {
		const user = await this.readOrNull(token);

		if (!user) {
			throw new NextkitError(401, 'Invalid session. Please log in again.');
		}

		return user;
	},

	async generateUniqueToken(): Promise<string> {
		const token = 'ts-' + randomBytes(128).toString('hex');

		const exists = await redis.exists(RedisKeys.session(token));

		if (exists) {
			return this.generateUniqueToken();
		}

		return token;
	},

	async create(userId: string, ttl = SEVEN_DAYS_IN_SECONDS) {
		const token = await this.generateUniqueToken();

		await redis.set(RedisKeys.session(token), userId, 'EX', ttl);

		return token;
	},

	async readOrNull(token: string) {
		const userId = await redis.get(RedisKeys.session(token));

		if (!userId) {
			return null;
		}

		return userId;
	},
};
