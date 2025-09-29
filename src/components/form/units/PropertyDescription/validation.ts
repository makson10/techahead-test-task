import z from 'zod';

export const propertyDescriptionSchema = z.object({
	propertyDescription: z
		.object({
			numKitchens: z.coerce.number().min(0).optional(),
			numBaths: z.coerce.number().min(0).optional(),
			numBedrooms: z.coerce.number().min(0).optional(),
			numOtherRooms: z.coerce.number().min(0).optional(),
			numStoriesAboveBasement: z.coerce.number().min(0).optional(),
			yearOfConstruction: z
				.union([
					z.string().trim().length(4),
					z.coerce.number().int().min(1700).max(3000),
				])
				.optional()
				.or(z.literal('')),
			parkingIndoor: z.coerce.number().min(0).optional(),
			parkingOutdoor: z.coerce.number().min(0).optional(),
			lastAlteration: z.string().trim().optional().or(z.literal('')),
			propertyType: z.enum([
				'one_family',
				'two_family',
				'three_family',
				'vacant_lot',
				'condo',
				'other',
			]),
			otherDescription: z.string().trim().optional().or(z.literal('')),
			residentialUnits: z.coerce.number().min(0).optional(),
			commercialUnits: z.coerce.number().min(0).optional(),
			basement: z.enum(['no', 'unfinished', 'finished']),
		})
		.superRefine((data, ctx) => {
			if (data.propertyType === 'other') {
				if (!data.otherDescription?.trim()) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['otherDescription'],
						message: 'Describe other property type',
					});
				}
				if (typeof data.residentialUnits !== 'number') {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['residentialUnits'],
						message: 'Enter number of residential units',
					});
				}
				if (typeof data.commercialUnits !== 'number') {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['commercialUnits'],
						message: 'Enter number of commercial units',
					});
				}
			}
		}),
});
