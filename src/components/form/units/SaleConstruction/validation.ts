import z from 'zod';

export const saleConstructionSchema = z.object({
	saleConstruction: z
		.object({
			boughtAfter2023: z
				.enum(['yes', 'no'])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select yes or no'),
			sellerName: z.string().trim().optional().or(z.literal('')),
			closingDate: z.string().trim().optional().or(z.literal('')),
			purchasePrice: z.coerce.number().min(0).optional(),

			signedContractToSell: z
				.enum(['yes', 'no'])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select yes or no'),
			buyerName: z.string().trim().optional().or(z.literal('')),
			contractDate: z.string().trim().optional().or(z.literal('')),
			contractPrice: z.coerce.number().min(0).optional(),

			offeredForSaleNow: z
				.enum(['yes', 'no'])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select yes or no'),
			offeringDetails: z.string().trim().optional().or(z.literal('')),

			refinancedSince2023: z
				.enum(['yes', 'no'])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select yes or no'),

			constructionOrDemolition: z
				.enum(['yes', 'no'])
				.or(z.literal(''))
				.refine((v) => v !== '', 'Select yes or no'),
			workDescription: z.string().trim().optional().or(z.literal('')),
			workStartDate: z.string().trim().optional().or(z.literal('')),
			workCompleteDate: z.string().trim().optional().or(z.literal('')),
			totalCost: z.coerce.number().min(0).optional(),
		})
		.superRefine((data, ctx) => {
			if (data.boughtAfter2023 === 'yes') {
				if (!data.sellerName?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['sellerName'],
						message: "Enter seller's name",
					});
				if (!data.closingDate?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['closingDate'],
						message: 'Enter closing date',
					});
				if (typeof data.purchasePrice !== 'number')
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['purchasePrice'],
						message: 'Enter price',
					});
			}
			if (data.signedContractToSell === 'yes') {
				if (!data.buyerName?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['buyerName'],
						message: "Enter buyer's name",
					});
				if (!data.contractDate?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['contractDate'],
						message: 'Enter contract date',
					});
				if (typeof data.contractPrice !== 'number')
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['contractPrice'],
						message: 'Enter price',
					});
			}
			if (data.offeredForSaleNow === 'yes' && !data.offeringDetails?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['offeringDetails'],
					message: 'Enter offering details and asking price',
				});
			}
			if (data.constructionOrDemolition === 'yes') {
				if (!data.workDescription?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['workDescription'],
						message: 'Describe the work',
					});
				if (!data.workStartDate?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['workStartDate'],
						message: 'Enter start date',
					});
				if (!data.workCompleteDate?.trim())
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['workCompleteDate'],
						message: 'Enter completion date',
					});
				if (typeof data.totalCost !== 'number')
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['totalCost'],
						message: 'Enter total cost',
					});
			}
		}),
});
