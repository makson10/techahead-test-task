import { FormProvider, useForm } from 'react-hook-form';
import { defaultValues } from '@/assets/defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from '../formSchema';
import PropertyField from './units/Property';
import ApplicantField from './units/Applicant';
import ContactField from './units/Contact';
import ValuationField from './units/Valuation';
import HearingField from './units/Hearing';
import PropertyDescriptionField from './units/PropertyDescription';
import NonresidentialField from './units/Nonresidential';
import SaleConstructionField from './units/SaleConstruction';
import SupportField from './units/Support';
import SignatureField from './units/Signature';
import { Import } from './buttons/Import';
import { Save } from './buttons/Save';
import { Clear } from './buttons/Clear';
import UnitWrapper from '../UnitWrapper';
import { downloadFile, readImportedFile } from '@/assets/fileHandlers';

const Form = () => {
	const methods = useForm<FormValues>({
		defaultValues,
		resolver: zodResolver(formSchema),
		mode: 'onBlur',
	});

	const {
		getValues,
		reset,
		clearErrors,
		formState: { isValid, isValidating },
	} = methods;

	const handleSave = () => downloadFile(getValues());

	const handleClear = () => {
		reset();
		clearErrors();
	};

	const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const values = await readImportedFile(file);
		reset(values as unknown as FormValues);
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<FormProvider {...methods}>
				<form className="rounded-md border border-gray-200 p-4 shadow-sm bg-white/50">
					<UnitWrapper>
						<PropertyField />
						<ApplicantField />
						<ContactField />
						<ValuationField />
						<HearingField />
						<PropertyDescriptionField />
						<NonresidentialField />
						<SaleConstructionField />
						<SupportField />
						<SignatureField />
					</UnitWrapper>

					<div className="mt-8 flex flex-wrap gap-3">
						<Import handleImport={handleImport} />
						<Save
							isDisabled={!isValid || isValidating}
							handleSave={handleSave}
						/>
						<Clear handleClear={handleClear} />
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default Form;
