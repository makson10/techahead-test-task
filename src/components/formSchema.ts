import { propertySchema } from './form/units/Property/validation';
import { applicantSchema } from './form/units/Applicant/validation';
import z from 'zod';

export const formSchema = z.object({
	...propertySchema.shape,
	...applicantSchema.shape,
});

export type FormValues = z.infer<typeof formSchema>;
