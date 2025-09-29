import { useFormContext } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const NonresidentialField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<div className="space-y-3 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				7. NONRESIDENTIAL RENTAL ACTIVITY – THIS PART MUST BE COMPLETED
			</h2>
			<p className="text-xs text-gray-700">
				Was any portion of the property rented or offered for rent for any
				nonresidential use (for example, commercial, retail or office use) in
				2024?
			</p>
			<div className="flex items-center gap-6 text-sm text-gray-700">
				<label className="inline-flex items-center gap-2">
					<input
						type="radio"
						value="no"
						{...register('nonresidential.wasRented')}
					/>{' '}
					No
				</label>
				<label className="inline-flex items-center gap-2">
					<input
						type="radio"
						value="yes"
						{...register('nonresidential.wasRented')}
					/>{' '}
					Yes
				</label>
			</div>
			{errors.nonresidential?.wasRented && (
				<p className="mt-1 text-xs text-red-600">
					{errors.nonresidential.wasRented.message as string}
				</p>
			)}
			<p className="text-xs font-semibold text-gray-900">
				NEW: IF YES, YOU MUST FILE TC201 (or TC203 for a condo board of
				managers).
			</p>
		</div>
	);
};

export default NonresidentialField;
