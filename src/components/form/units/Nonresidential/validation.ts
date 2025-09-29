import z from 'zod';

export const nonresidentialSchema = z.object({
	nonresidential: z.object({
		wasRented: z.enum(['yes', 'no']),
	}),
});
