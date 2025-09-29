import { useFormContext } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const SupportField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				9. INFORMATION IN SUPPORT
			</h2>
			<p className="text-xs text-gray-700">
				You must complete this part if you checked “Review on Papers” in Part 5.
			</p>

			<label className="inline-flex items-start gap-2 text-sm text-gray-700">
				<input type="checkbox" {...register('support.attachedProof')} />
				<span>
					Check here if sales or other proof of market value is provided on
					attached sheets.
				</span>
			</label>
			<p className="text-xs text-gray-700">
				If you are requesting an in-person hearing, you may provide this
				information at the hearing. See instructions for how to find comparable
				sales information or other evidence of market value.
			</p>

			<div className="grid grid-cols-3 gap-4">
				{[0, 1, 2].map((idx) => (
					<div key={idx} className="space-y-3">
						<h3 className="text-xs font-semibold text-gray-900">
							Sale {idx + 1}
						</h3>
						<div>
							<label className="block text-xs text-gray-700 mb-1">
								Sale Date
							</label>
							<input
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
								placeholder="MM/DD/YYYY"
								{...register(`support.sales.${idx}.saleDate` as const)}
							/>
						</div>
						<div>
							<label className="block text-xs text-gray-700 mb-1">
								Sales Price
							</label>
							<input
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
								placeholder="$0.00"
								{...register(`support.sales.${idx}.salesPrice` as const)}
							/>
						</div>
						<div>
							<label className="block text-xs text-gray-700 mb-1">
								Address
							</label>
							<input
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
								{...register(`support.sales.${idx}.address` as const)}
							/>
						</div>
						<div>
							<label className="block text-xs text-gray-700 mb-1">
								Block/lot
							</label>
							<input
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
								{...register(`support.sales.${idx}.blockLot` as const)}
							/>
						</div>
						<div>
							<label className="block text-xs text-gray-700 mb-1">
								Total dwelling units
							</label>
							<input
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
								{...register(
									`support.sales.${idx}.totalDwellingUnits` as const
								)}
							/>
						</div>
					</div>
				))}
			</div>

			{errors.support?.sales && (
				<p className="text-xs text-red-600">
					{errors.support.sales.message as string}
				</p>
			)}
		</div>
	);
};

export default SupportField;
