import z from 'zod';

export const signatureSchema = z.object({
	signature: z
		.object({
			signerName: z
				.string()
				.trim()
				.min(1, 'Enter the name of the person signing'),
			role: z.enum([
				'individual_applicant',
				'fiduciary',
				'corp_officer',
				'condo_officer',
				'general_partner',
				'llc_member_or_officer',
				'agent_other',
			]),
			fiduciaryRelationship: z.string().trim().optional().or(z.literal('')),
			entityName: z.string().trim().optional().or(z.literal('')),
			corpOfficerTitle: z.string().trim().optional().or(z.literal('')),
			condoOfficerTitle: z.string().trim().optional().or(z.literal('')),
			llcSignerTitle: z.string().trim().optional().or(z.literal('')),
		})
		.superRefine((data, ctx) => {
			if (data.role === 'fiduciary') {
				if (!data.fiduciaryRelationship?.trim()) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['fiduciaryRelationship'],
						message: "Specify fiduciary's relationship to Applicant",
					});
				}
			}
			if (data.role === 'corp_officer' && !data.corpOfficerTitle?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['corpOfficerTitle'],
					message: 'Enter corporate officer title',
				});
			}
			if (data.role === 'condo_officer' && !data.condoOfficerTitle?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['condoOfficerTitle'],
					message: 'Enter condominium board title',
				});
			}
			if (
				data.role === 'llc_member_or_officer' &&
				!data.llcSignerTitle?.trim()
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['llcSignerTitle'],
					message: "Enter signer's title",
				});
			}
		}),
});
