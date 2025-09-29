import { useFormContext } from 'react-hook-form';

const PropertyField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm text-gray-700 mb-1">Full name</label>
				<input
					className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
					placeholder="John Doe"
					{...register('fullName')}
				/>
				{errors.fullName && (
					<p className="mt-1 text-xs text-red-600">
						{errors.fullName.message as string}
					</p>
				)}
			</div>
		</div>
	);
};

export default PropertyField;
