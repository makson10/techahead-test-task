import { useFormContext } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const PropertyField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<div className="space-y-4">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				1. PROPERTY IDENTIFICATION
			</h2>
			<div>
				<label className="block text-sm text-gray-700 mb-1">Borough</label>
				<select
					className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
					{...register('property.borough')}>
					<option value="">Select borough</option>
					<option value="1">Manhattan (1)</option>
					<option value="2">Bronx (2)</option>
					<option value="3">Brooklyn (3)</option>
					<option value="4">Queens (4)</option>
					<option value="5">Staten Island (5)</option>
				</select>
				{errors.property?.borough && (
					<p className="mt-1 text-xs text-red-600">
						{errors.property.borough.message as string}
					</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm text-gray-700 mb-1">Block</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="e.g., 01234"
						{...register('property.block')}
					/>
					{errors.property?.block && (
						<p className="mt-1 text-xs text-red-600">
							{errors.property.block.message as string}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">Lot</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="e.g., 0012"
						{...register('property.lot')}
					/>
					{errors.property?.lot && (
						<p className="mt-1 text-xs text-red-600">
							{errors.property.lot.message as string}
						</p>
					)}
				</div>
			</div>

			<div>
				<label className="block text-sm text-gray-700 mb-1">
					Full address of property (including zip code)
				</label>
				<input
					className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
					placeholder="Street number and name"
					{...register('property.fullAddress')}
				/>
				{errors.property?.fullAddress && (
					<p className="mt-1 text-xs text-red-600">
						{errors.property.fullAddress.message as string}
					</p>
				)}
			</div>
		</div>
	);
};

export default PropertyField;
