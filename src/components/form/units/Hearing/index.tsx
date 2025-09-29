import { useFormContext } from 'react-hook-form';
import type { FormValues } from '@/components/formSchema';

const HearingField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<div className="space-y-4 mt-6">
			<h2 className="text-sm font-semibold text-gray-900 uppercase">
				5. HEARING REQUEST - Check one box only
			</h2>

			<div className="space-y-2">
				<label className="inline-flex items-center gap-2 text-sm text-gray-700">
					<input type="radio" value="paper" {...register('hearing.request')} />
					<span>Review on papers submitted WITHOUT an in-person hearing</span>
				</label>

				<p className="text-center text-xs text-gray-500">OR</p>

				<div className="flex flex-col">
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="in_person"
							{...register('hearing.request')}
						/>
						<span>In-person hearing in Manhattan</span>
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="telephone"
							{...register('hearing.request')}
						/>
						<span>Telephone hearing</span>
					</label>
					<label className="inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="radio"
							value="video"
							{...register('hearing.request')}
						/>
						<span>Video conference using Microsoft Teams</span>
					</label>
				</div>
			</div>

			{errors.hearing?.request && (
				<p className="mt-1 text-xs text-red-600">
					{errors.hearing.request.message as string}
				</p>
			)}
		</div>
	);
};

export default HearingField;
