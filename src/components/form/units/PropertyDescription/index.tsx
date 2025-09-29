import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const PropertyDescriptionField = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	const type = useWatch({ control, name: 'propertyDescription.propertyType' });

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				6. PROPERTY DESCRIPTION AS OF JANUARY 5, 2025
			</h2>
			<p className="text-xs text-gray-700">
				Complete every item. Note: The Tax Commission cannot change the physical
				description shown on your Notice of Property Value.
			</p>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Number of kitchens
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						{...register('propertyDescription.numKitchens')}
					/>
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Number of baths
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						{...register('propertyDescription.numBaths')}
					/>
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Number of bedrooms
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						{...register('propertyDescription.numBedrooms')}
					/>
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Number of other rooms
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						{...register('propertyDescription.numOtherRooms')}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Number of stories (above basement)
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						{...register('propertyDescription.numStoriesAboveBasement')}
					/>
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Year of construction (if known)
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						placeholder="YYYY"
						{...register('propertyDescription.yearOfConstruction')}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Number of parking spaces on the property
					</label>
					<div className="grid grid-cols-2 gap-3">
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Indoor (garage)"
							{...register('propertyDescription.parkingIndoor')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Outdoor"
							{...register('propertyDescription.parkingOutdoor')}
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Year and description of last physical alteration or addition
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						placeholder="Year and description"
						{...register('propertyDescription.lastAlteration')}
					/>
				</div>
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					a) The property is:
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="one_family"
							{...register('propertyDescription.propertyType')}
						/>{' '}
						1-family house
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="two_family"
							{...register('propertyDescription.propertyType')}
						/>{' '}
						2-family house
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="three_family"
							{...register('propertyDescription.propertyType')}
						/>{' '}
						3-family house
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="vacant_lot"
							{...register('propertyDescription.propertyType')}
						/>{' '}
						Vacant lot zoned residential and located outside Manhattan
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="condo"
							{...register('propertyDescription.propertyType')}
						/>{' '}
						Class One condominium unit
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="other"
							{...register('propertyDescription.propertyType')}
						/>{' '}
						Other (describe)
					</label>
				</div>
				{type === 'other' && (
					<div className="grid grid-cols-3 gap-3">
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Describe other"
							{...register('propertyDescription.otherDescription')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="# of residential units"
							{...register('propertyDescription.residentialUnits')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="# of commercial units"
							{...register('propertyDescription.commercialUnits')}
						/>
					</div>
				)}
				{errors?.propertyDescription?.otherDescription && (
					<p className="mt-1 text-xs text-red-600">
						{errors.propertyDescription.otherDescription.message as string}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					b) Is there a basement?
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('propertyDescription.basement')}
						/>{' '}
						No
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="unfinished"
							{...register('propertyDescription.basement')}
						/>{' '}
						Yes, unfinished space only
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="finished"
							{...register('propertyDescription.basement')}
						/>{' '}
						Yes, finished living space
					</label>
				</div>
			</div>
		</div>
	);
};

export default PropertyDescriptionField;
