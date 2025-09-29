import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const SaleConstructionField = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	const bought = useWatch({
		control,
		name: 'saleConstruction.boughtAfter2023',
	});
	const contracted = useWatch({
		control,
		name: 'saleConstruction.signedContractToSell',
	});
	const offered = useWatch({
		control,
		name: 'saleConstruction.offeredForSaleNow',
	});
	const refinanced = useWatch({
		control,
		name: 'saleConstruction.refinancedSince2023',
	});
	const construction = useWatch({
		control,
		name: 'saleConstruction.constructionOrDemolition',
	});

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				8. SALE, CONSTRUCTION, DEMOLITION OR REFINANCING – COMPLETE ALL ITEMS
			</h2>
			<p className="text-xs text-gray-700">Attach extra pages if needed.</p>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					a) Did the current owner buy this property after January 5, 2023?
				</label>
				<div className="flex items-center gap-6 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('saleConstruction.boughtAfter2023')}
						/>{' '}
						NO
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register('saleConstruction.boughtAfter2023')}
						/>{' '}
						YES
					</label>
				</div>
				{errors.saleConstruction?.boughtAfter2023 && (
					<p className="mt-1 text-xs text-red-600">
						{errors.saleConstruction.boughtAfter2023.message as string}
					</p>
				)}
				{bought === 'yes' && (
					<div className="grid grid-cols-3 gap-3">
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Seller’s Name"
							{...register('saleConstruction.sellerName')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Closing Date (MM/DD/YYYY)"
							{...register('saleConstruction.closingDate')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Price $"
							{...register('saleConstruction.purchasePrice')}
						/>
					</div>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					b) Has the current owner of this property signed a contract to sell
					it?
				</label>
				<div className="flex items-center gap-6 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('saleConstruction.signedContractToSell')}
						/>{' '}
						NO
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register('saleConstruction.signedContractToSell')}
						/>{' '}
						YES
					</label>
				</div>
				{errors.saleConstruction?.signedContractToSell && (
					<p className="mt-1 text-xs text-red-600">
						{errors.saleConstruction.signedContractToSell.message as string}
					</p>
				)}
				{contracted === 'yes' && (
					<div className="grid grid-cols-3 gap-3">
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Buyer’s Name"
							{...register('saleConstruction.buyerName')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Contract Date (MM/DD/YYYY)"
							{...register('saleConstruction.contractDate')}
						/>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="Price $"
							{...register('saleConstruction.contractPrice')}
						/>
					</div>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					c) Is the property being offered for sale now?
				</label>
				<div className="flex items-center gap-6 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('saleConstruction.offeredForSaleNow')}
						/>{' '}
						NO
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register('saleConstruction.offeredForSaleNow')}
						/>{' '}
						YES
					</label>
				</div>
				{errors.saleConstruction?.offeredForSaleNow && (
					<p className="mt-1 text-xs text-red-600">
						{errors.saleConstruction.offeredForSaleNow.message as string}
					</p>
				)}
				{offered === 'yes' && (
					<input
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
						placeholder="Report details of offering, including asking price"
						{...register('saleConstruction.offeringDetails')}
					/>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					d) Since January 5, 2023 has the property been refinanced?
				</label>
				<div className="flex items-center gap-6 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('saleConstruction.refinancedSince2023')}
						/>{' '}
						NO
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register('saleConstruction.refinancedSince2023')}
						/>{' '}
						YES
					</label>
				</div>
				{errors.saleConstruction?.refinancedSince2023 && (
					<p className="mt-1 text-xs text-red-600">
						{errors.saleConstruction.refinancedSince2023.message as string}
					</p>
				)}
				{refinanced === 'yes' && (
					<p className="text-xs text-gray-700">
						Attach documents showing what the property was appraised at when it
						was refinanced.
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-900">
					e) Since January 5, 2023 has there been any construction, demolition
					or major alteration work or plans for demolition or a new building
					been filed with the Buildings Dept.?
				</label>
				<div className="flex items-center gap-6 text-sm text-gray-700">
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register('saleConstruction.constructionOrDemolition')}
						/>{' '}
						NO
					</label>
					<label className="inline-flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register('saleConstruction.constructionOrDemolition')}
						/>{' '}
						YES
					</label>
				</div>
				{errors.saleConstruction?.refinancedSince2023 && (
					<p className="mt-1 text-xs text-red-600">
						{errors.saleConstruction.refinancedSince2023.message as string}
					</p>
				)}
				{construction === 'yes' && (
					<div className="space-y-2">
						<label className="block text-sm">(1) What work was done?</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							{...register('saleConstruction.workDescription')}
						/>
						<div className="grid grid-cols-2 gap-3">
							<div className="grid grid-cols-2 gap-2 items-center">
								<label className="text-sm">(2) Date work started:</label>
								<input
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
									placeholder="MM/DD/YYYY"
									{...register('saleConstruction.workStartDate')}
								/>
							</div>
							<div className="grid grid-cols-2 gap-2 items-center">
								<label className="text-sm">
									Date work completed (or will be):
								</label>
								<input
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
									placeholder="MM/DD/YYYY"
									{...register('saleConstruction.workCompleteDate')}
								/>
							</div>
						</div>
						<label className="block text-sm">
							(3) The total direct and indirect cost ($):
						</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
							placeholder="0.00"
							{...register('saleConstruction.totalCost')}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default SaleConstructionField;
