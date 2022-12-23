import {envsafe, str, url} from 'envsafe';

export const SERVER_ENV = envsafe({
	REDIS_URL: url(),
});
