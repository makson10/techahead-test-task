import { propertySchema } from './form/units/Property/validation';
import z from 'zod';

export const formSchema = propertySchema.extend({});

export type FormValues = z.infer<typeof formSchema>;
