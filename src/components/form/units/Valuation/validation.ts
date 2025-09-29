import z from 'zod';

export const valuationSchema = z.object({
	valuation: z
		.object({
			marketValue: z.coerce.number().min(0, 'Value must be 0 or greater'),
			sixPercent: z.coerce.number().min(0, 'Value must be 0 or greater'),
			assessedValue: z.coerce.number().min(0, 'Value must be 0 or greater'),
		})
		.superRefine((data, ctx) => {
			if (data.assessedValue < data.sixPercent) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['assessedValue'],
					message: 'Line c must be greater than or equal to line b (0.06 × a)',
				});
			}
		}),
});
