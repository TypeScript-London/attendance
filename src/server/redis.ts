import Redis from 'ioredis';
import {SERVER_ENV} from './env';

export const redis = new Redis(SERVER_ENV.REDIS_URL);

export const RedisKeys = {
	session: (token: string) => `session:${token}`,
};
