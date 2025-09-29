interface Props {
	isDisabled: boolean;
}

export const Save = ({ isDisabled }: Props) => (
	<button
		type="submit"
		className="rounded-md bg-emerald-600 text-white px-4 py-2 text-sm disabled:opacity-50 cursor-pointer"
		disabled={isDisabled}>
		Save
	</button>
);
