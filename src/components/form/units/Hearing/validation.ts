import z from 'zod';

export const hearingSchema = z.object({
	hearing: z.object({
		request: z.enum(['paper', 'in_person', 'telephone', 'video']),
	}),
});
