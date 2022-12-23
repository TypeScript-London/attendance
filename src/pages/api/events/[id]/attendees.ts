import {api} from '../../../../server/api';
import {z} from 'zod';
import {id} from '../../../../server/pika';

const schema = z.object({
	id: id('attendance'),
});

export default api({
	POST: async ({ctx, req, res}) => {
		const user = await ctx.sessions.read();
		const {id: event} = schema.parse(req.query);

		await res.revalidate('/');

		return ctx.prisma.attendance.create({
			data: {
				id: ctx.pika.gen('attendance'),
				user_id: user,
				event_id: event,
			},
			select: {
				id: true,
			},
		});
	},

	DELETE: async ({ctx, req, res}) => {
		const user = await ctx.sessions.read();
		const {id: event} = schema.parse(req.query);

		await res.revalidate('/');

		await ctx.prisma.attendance.delete({
			where: {
				user_id_event_id: {
					user_id: user,
					event_id: event,
				},
			},
			select: {
				id: true,
			},
		});
	},
});
