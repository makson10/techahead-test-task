import z from 'zod';

export const propertySchema = z.object({
	property: z.object({
		borough: z
			.string()
			.trim()
			.min(1, 'Borough is required')
			.regex(/^[1-5]$/u, 'Invalid borough'),
		block: z
			.string()
			.trim()
			.min(1, 'Block is required')
			.regex(/^\d{1,5}$/u, 'Block must be 1-5 digits'),
		lot: z
			.string()
			.trim()
			.min(1, 'Lot is required')
			.regex(/^\d{1,4}$/u, 'Lot must be 1-4 digits'),
		fullAddress: z
			.string()
			.trim()
			.min(1, 'Street address is required')
			.refine((value) => /\b\d{5}(?:-\d{4})?\b/u.test(value), {
				message: 'Address must include ZIP (##### or #####-####)',
			}),
	}),
});
