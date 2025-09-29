import z from 'zod';

const saleEntry = z.object({
	saleDate: z.string().trim().optional().or(z.literal('')),
	salesPrice: z.coerce.number().min(0).optional(),
	address: z.string().trim().optional().or(z.literal('')),
	blockLot: z.string().trim().optional().or(z.literal('')),
	totalDwellingUnits: z.coerce.number().min(0).optional(),
});

export const supportSchema = z.object({
	support: z
		.object({
			attachedProof: z.boolean().optional().default(false),
			sales: z.array(saleEntry).length(3),
		})
		.superRefine((data, ctx) => {
			if (!data.attachedProof) {
				const hasComparable = data.sales?.some(
					(s) => !!s.saleDate && typeof s.salesPrice === 'number'
				);
				if (!hasComparable) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['sales'],
						message:
							'Provide at least one sale with date and price or check the attachment box.',
					});
				}
			}
		}),
});
