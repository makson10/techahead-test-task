import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const ContactField = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	const hasRep = useWatch({ control, name: 'contact.hasRepresentative' });
	const repType = useWatch({ control, name: 'contact.representativeType' });

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				3. CONTACT INFORMATION
			</h2>

			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2">
					<label className="block text-sm text-gray-700 mb-1">
						Name of individual or firm to be contacted
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="Contact name or firm"
						{...register('contact.contactName')}
					/>
					{errors.contact?.contactName && (
						<p className="mt-1 text-xs text-red-600">
							{errors.contact.contactName.message as string}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Group # (if any)
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="Group #"
						{...register('contact.groupNumber')}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Phone number
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="(212) 555-1234"
						{...register('contact.phone')}
					/>
					{errors.contact?.phone && (
						<p className="mt-1 text-xs text-red-600">
							{errors.contact.phone.message as string}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm text-gray-700 mb-1">
						Email address
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="name@example.com"
						{...register('contact.email')}
					/>
					{errors.contact?.email && (
						<p className="mt-1 text-xs text-red-600">
							{errors.contact.email.message as string}
						</p>
					)}
				</div>
			</div>

			<div>
				<label className="block text-sm text-gray-700 mb-1">
					Mailing address
				</label>
				<input
					className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
					placeholder="Street number and name"
					{...register('contact.mailingAddress')}
				/>
				{errors.contact?.mailingAddress && (
					<p className="mt-1 text-xs text-red-600">
						{errors.contact.mailingAddress.message as string}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					Will an appointed Representative handle this application for the
					Applicant? (Check One)
				</label>
				<div className="mt-1 flex items-center gap-6 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('contact.hasRepresentative')}
						/>{' '}
						No
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register('contact.hasRepresentative')}
						/>{' '}
						Yes
					</label>
				</div>
				{errors.contact?.hasRepresentative && (
					<p className="mt-1 text-xs text-red-600">
						{errors.contact.hasRepresentative.message as string}
					</p>
				)}

				{hasRep === 'yes' && (
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-900">
							If “Yes”, check type of Representative
						</label>
						<div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
							<label className="inline-flex items-center gap-2 text-sm text-gray-700">
								<input
									type="radio"
									value="attorney"
									{...register('contact.representativeType')}
								/>{' '}
								Attorney
							</label>
							<label className="inline-flex items-center gap-2 text-sm text-gray-700">
								<input
									type="radio"
									value="other"
									{...register('contact.representativeType')}
								/>{' '}
								Other (specify)
							</label>
						</div>
						{errors.contact?.representativeType && (
							<p className="mt-1 text-xs text-red-600">
								{errors.contact.representativeType.message as string}
							</p>
						)}
						{repType === 'other' && (
							<div>
								<input
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
									placeholder="Specify representative"
									{...register('contact.representativeOther')}
								/>
								{errors.contact?.representativeOther && (
									<p className="mt-1 text-xs text-red-600">
										{errors.contact.representativeOther.message as string}
									</p>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ContactField;
