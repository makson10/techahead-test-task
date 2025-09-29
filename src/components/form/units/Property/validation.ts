import z from 'zod';

export const propertySchema = z.object({
	fullName: z.string(),
});

export type Property = z.infer<typeof propertySchema>;
