import z from 'zod';

export const applicantSchema = z.object({
	applicant: z
		.object({
			applicantName: z.string().trim().min(1, "Applicant's name is required"),
			applicantDescription: z.enum(['owner', 'tenant', 'other']),
			applicantOther: z.string().trim().optional().or(z.literal('')),
			isCondoBoardAgent: z.boolean(),
			boardAuthority: z
				.enum(['bylaws', 'individual', 'poa'])
				.optional()
				.or(z.literal('')),
		})
		.superRefine((data, ctx) => {
			if (
				data.applicantDescription === 'other' &&
				!data.applicantOther?.trim()
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['applicantOther'],
					message: 'Specify applicant when Other is selected',
				});
			}
			if (data.isCondoBoardAgent && !data.boardAuthority) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['boardAuthority'],
					message: "Select the source of Board's authority",
				});
			}
		}),
});
