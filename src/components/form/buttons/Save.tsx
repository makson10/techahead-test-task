interface Props {
	handleSave: () => void;
}

export const Save = ({ handleSave }: Props) => (
	<button
		className="rounded-md bg-emerald-600 text-white px-4 py-2 text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
		onClick={handleSave}>
		Save
	</button>
);
