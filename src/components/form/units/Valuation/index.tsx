import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const ValuationField = () => {
	const {
		register,
		setValue,
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	const marketValue = useWatch({ control, name: 'valuation.marketValue' });

	useEffect(() => {
		const a = Number(marketValue ?? 0);
		const b = Number.isFinite(a) ? Number((a * 0.06).toFixed(2)) : 0;
		setValue('valuation.sixPercent', b, {
			shouldValidate: true,
			shouldDirty: true,
		});
	}, [marketValue, setValue]);

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				4. VALUATION CLAIM
			</h2>

			<p className="text-xs text-gray-700">
				The Tax Commission cannot change the estimate of market value shown on
				your Notice of Property Value. See instructions for an explanation of
				market value.
			</p>

			<div className="grid grid-cols-1 gap-4">
				<div className="grid grid-cols-[auto_1fr] items-center gap-3">
					<label className="text-sm text-gray-900">
						a) Applicant's estimate of market value ($)
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="0.00"
						inputMode="decimal"
						{...register('valuation.marketValue')}
					/>
				</div>
				{errors.valuation?.marketValue && (
					<p className="-mt-2 text-xs text-red-600">
						{errors.valuation.marketValue.message as string}
					</p>
				)}

				<div className="grid grid-cols-[auto_1fr] items-center gap-3">
					<label className="text-sm text-gray-900">
						b) Multiply line a by 6% (.06) ($)
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-50"
						readOnly
						{...register('valuation.sixPercent')}
					/>
				</div>
				{errors.valuation?.sixPercent && (
					<p className="-mt-2 text-xs text-red-600">
						{errors.valuation.sixPercent.message as string}
					</p>
				)}

				<div className="grid grid-cols-[auto_1fr] items-center gap-3">
					<label className="text-sm text-gray-900">
						c) Assessed Value (from Notice of Property Value) ($)
					</label>
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
						placeholder="0.00"
						inputMode="decimal"
						{...register('valuation.assessedValue')}
					/>
				</div>
				{errors.valuation?.assessedValue && (
					<p className="-mt-2 text-xs text-red-600">
						{errors.valuation.assessedValue.message as string}
					</p>
				)}
			</div>

			<p className="text-xs text-gray-700">
				If line c is less than line b, DO NOT FILE TC108. You have the right to
				allege an assessment ratio lower than the 6% ratio used in setting the
				assessment and seek a lower assessment in a proceeding for judicial
				review. See TC600.
			</p>
		</div>
	);
};

export default ValuationField;
