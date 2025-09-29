interface Props {
	handleClear: () => void;
}

export const Clear = ({ handleClear }: Props) => (
	<button
		onClick={handleClear}
		className="rounded-md bg-rose-600 text-white px-4 py-2 text-sm hover:bg-rose-700 cursor-pointer">
		Clear
	</button>
);
