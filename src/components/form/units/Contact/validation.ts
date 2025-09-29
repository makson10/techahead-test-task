import z from 'zod';

export const contactSchema = z.object({
	contact: z
		.object({
			contactName: z.string().trim().min(1, 'Contact name is required'),
			groupNumber: z.string().trim().optional().or(z.literal('')),
			phone: z
				.string()
				.trim()
				.regex(
					/^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/u,
					'Invalid phone number'
				),
			mailingAddress: z.string().trim().min(1, 'Mailing address is required'),
			email: z.string().trim().email('Invalid email address'),
			hasRepresentative: z.enum(['yes', 'no']),
			representativeType: z
				.enum(['attorney', 'other'])
				.optional()
				.or(z.literal('')),
			representativeOther: z.string().trim().optional().or(z.literal('')),
		})
		.superRefine((data, ctx) => {
			if (data.hasRepresentative === 'yes' && !data.representativeType) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['representativeType'],
					message: 'Select representative type',
				});
			}
			if (
				data.hasRepresentative === 'yes' &&
				data.representativeType === 'other' &&
				!data.representativeOther?.trim()
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['representativeOther'],
					message: 'Specify the type of representative',
				});
			}
		}),
});
