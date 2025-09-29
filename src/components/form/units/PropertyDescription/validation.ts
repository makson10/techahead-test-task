import z from 'zod';

export const propertyDescriptionSchema = z.object({
	propertyDescription: z
		.object({
			numKitchens: z.coerce.number().min(0, 'Enter number of kitchens'),
			numBaths: z.coerce.number().min(0, 'Enter number of baths'),
			numBedrooms: z.coerce.number().min(0, 'Enter number of bedrooms'),
			numOtherRooms: z.coerce.number().min(0, 'Enter number of other rooms'),
			numStoriesAboveBasement: z.coerce
				.number()
				.min(0, 'Enter number of stories (above basement)'),
			yearOfConstruction: z
				.union([z.string().trim(), z.coerce.number().int().min(1700).max(3000)])
				.optional()
				.or(z.literal(''))
				.refine(
					(v) =>
						typeof v === 'string'
							? v.trim().length === 0 || v.trim().length === 4
							: true,
					'Enter a 4-digit year'
				),
			parkingIndoor: z.coerce.number().min(0, 'Enter indoor parking spaces'),
			parkingOutdoor: z.coerce.number().min(0, 'Enter outdoor parking spaces'),
			lastAlteration: z.string().trim(),
			propertyType: z
				.enum([
					'one_family',
					'two_family',
					'three_family',
					'vacant_lot',
					'condo',
					'other',
				])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select property type'),
			otherDescription: z.string().trim().optional().or(z.literal('')),
			residentialUnits: z.coerce.number().min(0).optional(),
			commercialUnits: z.coerce.number().min(0).optional(),
			basement: z
				.enum(['no', 'unfinished', 'finished'])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select basement option'),
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
