interface Props {
	isDisabled: boolean;
	handleSave: () => void;
}

export const Save = ({ isDisabled, handleSave }: Props) => (
	<button
		className="rounded-md bg-emerald-600 text-white px-4 py-2 text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
		onClick={handleSave}
		disabled={isDisabled}>
		Save
	</button>
);
