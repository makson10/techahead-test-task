import { FormProvider, useForm } from 'react-hook-form';
import { defaultValues } from '@/assets/defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from '../formSchema';
import PropertyField from './units/Property';
import ApplicantField from './units/Applicant';
import { Import } from './buttons/Import';
import { Save } from './buttons/Save';
import { Clear } from './buttons/Clear';
import Divider from '../Divider';

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
		handleSubmit,
		formState: { isValid, isValidating },
	} = methods;

	const handleSave = () => {
		const values = getValues();
		console.log(values);
	};

	const handleClear = () => {
		reset();
		clearErrors();
	};

	const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
		// const file = event.target.files?.[0];
		// if (!file) return;
		// try {
		// 	const text = await file.text();
		// 	const data = JSON.parse(text) as Partial<FormValues>;
		// 	if (typeof data.fullName === 'string')
		// 		setValue('fullName', data.fullName);
		// 	if (typeof data.email === 'string') setValue('email', data.email);
		// 	if (typeof (data as any).age !== 'undefined')
		// 		setValue('age', (data as any).age as number);
		// 	if (typeof data.country === 'string') setValue('country', data.country);
		// 	if (typeof data.acceptTerms === 'boolean')
		// 		setValue('acceptTerms', data.acceptTerms);
		// } catch {
		// 	alert('Invalid JSON file');
		// }
		// event.currentTarget.value = '';
	};

	return (
		<div className="max-w-xl mx-auto p-4">
			<FormProvider {...methods}>
				<form
					className="rounded-md border border-gray-200 p-4 shadow-sm bg-white/50"
					onSubmit={handleSubmit(handleSave)}>
					<PropertyField />
					<Divider />
					<ApplicantField />
					<Divider />

					<div className="mt-8 flex flex-wrap gap-3">
						<Import handleImport={handleImport} />
						<Save isDisabled={!isValid || isValidating} />
						<Clear handleClear={handleClear} />
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default Form;
