import { propertySchema } from './form/units/Property/validation';
import { applicantSchema } from './form/units/Applicant/validation';
import { contactSchema } from './form/units/Contact/validation';
import { valuationSchema } from './form/units/Valuation/validation';
import { hearingSchema } from './form/units/Hearing/validation';
import { propertyDescriptionSchema } from './form/units/PropertyDescription/validation';
import { nonresidentialSchema } from './form/units/Nonresidential/validation';
import { saleConstructionSchema } from './form/units/SaleConstruction/validation';
import { supportSchema } from './form/units/Support/validation';
import { signatureSchema } from './form/units/Signature/validation';
import z from 'zod';

export const formSchema = z.object({
	...propertySchema.shape,
	...applicantSchema.shape,
	...contactSchema.shape,
	...valuationSchema.shape,
	...hearingSchema.shape,
	...propertyDescriptionSchema.shape,
	...nonresidentialSchema.shape,
	...saleConstructionSchema.shape,
	...supportSchema.shape,
	...signatureSchema.shape,
});

export type FormValues = z.input<typeof formSchema>;
