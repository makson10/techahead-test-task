import z from 'zod';

export const nonresidentialSchema = z.object({
	nonresidential: z.object({
		wasRented: z
			.enum(['yes', 'no'])
			.or(z.literal(''))
			.refine((v) => v !== '', 'Select yes or no'),
	}),
});
