import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const SignatureField = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	const role = useWatch({ control, name: 'signature.role' });

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				10. SIGNATURE AND CERTIFICATION
			</h2>
			<p className="text-xs text-gray-700">
				This application must be signed by an individual having personal
				knowledge of the facts who is: the owner or other Applicant named in
				Part 2 or another authorized individual acting for the Applicant.
			</p>

			<div>
				<label className="block text-sm font-medium text-gray-900">
					a) Print clearly name of person signing:
				</label>
				<input
					className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
					placeholder="Full name"
					{...register('signature.signerName')}
				/>
				{errors.signature?.signerName && (
					<p className="mt-1 text-xs text-red-600">
						{errors.signature.signerName.message as string}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					b) The person signing is (check one box only):
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="individual_applicant"
							{...register('signature.role')}
						/>{' '}
						The Applicant (check this box only if Applicant is an individual)
					</label>
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="fiduciary"
							{...register('signature.role')}
						/>{' '}
						Fiduciary. Specify fiduciary’s relationship to Applicant
					</label>
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="corp_officer"
							{...register('signature.role')}
						/>{' '}
						An officer of a corporate Applicant. Title:
					</label>
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="condo_officer"
							{...register('signature.role')}
						/>{' '}
						An officer of the condominium board of managers. Title:
					</label>
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="general_partner"
							{...register('signature.role')}
						/>{' '}
						General partner of partnership Applicant
					</label>
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="llc_member_or_officer"
							{...register('signature.role')}
						/>{' '}
						Member or manager of, or individual officer of, LLC Applicant.
						Signer’s Title:
					</label>
					<label className="inline-flex items-start gap-2">
						<input
							type="radio"
							value="agent_other"
							{...register('signature.role')}
						/>{' '}
						An attorney, employee, property manager or other agent for the
						Applicant.
					</label>
				</div>

				{role === 'fiduciary' && (
					<div className="grid grid-cols-2 gap-3 mt-2">
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Fiduciary relationship to Applicant"
							{...register('signature.fiduciaryRelationship')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="If signing for a corporation/partnership/LLC, enter name of entity"
							{...register('signature.entityName')}
						/>
					</div>
				)}
				{role === 'corp_officer' && (
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm mt-2"
						placeholder="Corporate officer title"
						{...register('signature.corpOfficerTitle')}
					/>
				)}
				{role === 'condo_officer' && (
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm mt-2"
						placeholder="Condominium board title"
						{...register('signature.condoOfficerTitle')}
					/>
				)}
				{role === 'llc_member_or_officer' && (
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm mt-2"
						placeholder="Signer’s Title"
						{...register('signature.llcSignerTitle')}
					/>
				)}

				<p className="text-xs text-gray-700 mt-2">
					If you checked agent/other, a notarized Power of Attorney AND Form
					TC244 must be attached or your application will be dismissed. Write
					“Special Counsel Review” on the top of page 1.
				</p>
			</div>
		</div>
	);
};

export default SignatureField;
