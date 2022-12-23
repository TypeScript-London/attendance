import {NextkitError} from 'nextkit';
import {z} from 'zod';
import {email, password} from '../../../schemas/users';
import {api} from '../../../server/api';

export const loginSchema = z.object({
	email,
	password,
});

export default api({
	POST: async ({ctx, req}) => {
		const {email, password} = loginSchema.parse(req.body);

		const name = await ctx.redis.hget('initial-users', email);

		if (!name) {
			throw new NextkitError(
				401,
				'You are not allowed to claim, or have already claimed an account!',
			);
		}

		await ctx.redis.hdel('initial-users', email);

		const user = await ctx.prisma.user.create({
			data: {
				id: ctx.pika.gen('user'),
				email,
				name,
				password: await ctx.hash(password),
			},
			select: {
				id: true,
			},
		});

		if (req.headers['content-type'] === 'application/json') {
			return user;
		}

		return {
			_redirect: '/claimed',
		};
	},
});
