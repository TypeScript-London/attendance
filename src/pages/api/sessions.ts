import {NextkitError} from 'nextkit';
import {api} from '../../server/api';
import {SEVEN_DAYS_IN_SECONDS} from '../../server/sessions';
import {loginSchema} from './users/claim';
import {serialize} from 'cookie';

export default api({
	POST: async ({ctx, req, res}) => {
		const {email, password} = loginSchema.parse(req.body);

		const user = await ctx.prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				password: true,
			},
		});

		if (!user) {
			throw new NextkitError(404, 'User not found');
		}

		const valid = await ctx.verify(user.password, password);

		if (!valid) {
			throw new NextkitError(401, 'Invalid credentials');
		}

		const session = await ctx.sessions.create(user.id, SEVEN_DAYS_IN_SECONDS);

		res.setHeader(
			'Set-Cookie',
			serialize('session', session, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: SEVEN_DAYS_IN_SECONDS,
				path: '/',
			}),
		);

		if (req.headers['content-type'] === 'application/json') {
			return;
		}

		return {
			_redirect: '/',
		};
	},
});
