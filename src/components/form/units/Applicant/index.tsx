import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const ApplicantField = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	const isCondoBoardAgent = useWatch({
		control,
		name: 'applicant.isCondoBoardAgent',
	});
	const applicantDescription = useWatch({
		control,
		name: 'applicant.applicantDescription',
	});

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				2. APPLICANT INFORMATION
			</h2>

			<div className="space-y-3 pt-2">
				<label className="block text-sm font-medium text-gray-900">
					a) Applicant's Name
				</label>
				<input
					className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
					placeholder="Applicant's full name"
					{...register('applicant.applicantName')}
				/>
				{errors.applicant?.applicantName && (
					<p className="mt-1 text-xs text-red-600">
						{errors.applicant.applicantName.message as string}
					</p>
				)}

				<div>
					<label className="block text-sm font-medium text-gray-900">
						b) Applicant Description (check one)
					</label>
					<div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
						<label className="inline-flex items-center gap-2 text-sm text-gray-700">
							<input
								type="radio"
								value="owner"
								{...register('applicant.applicantDescription')}
							/>{' '}
							Owner
						</label>
						<label className="inline-flex items-center gap-2 text-sm text-gray-700">
							<input
								type="radio"
								value="tenant"
								{...register('applicant.applicantDescription')}
							/>{' '}
							Tenant paying all taxes
						</label>
						<label className="inline-flex items-center gap-2 text-sm text-gray-700">
							<input
								type="radio"
								value="other"
								{...register('applicant.applicantDescription')}
							/>{' '}
							Other (specify)
						</label>
					</div>
					{errors.applicant?.applicantDescription && (
						<p className="mt-1 text-xs text-red-600">
							{errors.applicant.applicantDescription.message as string}
						</p>
					)}
					{applicantDescription === 'other' && (
						<div className="mt-2">
							<input
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
								placeholder="Specify applicant"
								{...register('applicant.applicantOther')}
							/>
							{errors.applicant?.applicantOther && (
								<p className="mt-1 text-xs text-red-600">
									{errors.applicant.applicantOther.message as string}
								</p>
							)}
						</div>
					)}
				</div>

				<div className="space-y-2">
					<p className="text-sm text-gray-900">
						IF YOU DON’T SUBMIT FORM TC200, YOUR APPLICATION WILL NOT BE
						REVIEWED.
					</p>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="checkbox"
							{...register('applicant.isCondoBoardAgent')}
						/>{' '}
						Condo board of managers designated as agent for condo unit owner to
						contest assessment (Attach list of covered lots).
					</label>
					{isCondoBoardAgent && (
						<div className="ml-5">
							<p className="text-sm text-gray-900">
								Source of Board’s authority (check one):
							</p>
							<div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
								<label className="inline-flex items-center gap-2 text-sm text-gray-700">
									<input
										type="radio"
										value="bylaws"
										{...register('applicant.boardAuthority')}
									/>{' '}
									By-laws
								</label>
								<label className="inline-flex items-center gap-2 text-sm text-gray-700">
									<input
										type="radio"
										value="individual"
										{...register('applicant.boardAuthority')}
									/>{' '}
									Individual authorization, valid under applicable law
								</label>
								<label className="inline-flex items-center gap-2 text-sm text-gray-700">
									<input
										type="radio"
										value="poa"
										{...register('applicant.boardAuthority')}
									/>{' '}
									Power-of-Attorney
								</label>
							</div>
							{errors.applicant?.boardAuthority && (
								<p className="mt-1 text-xs text-red-600">
									{errors.applicant.boardAuthority.message as string}
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ApplicantField;
