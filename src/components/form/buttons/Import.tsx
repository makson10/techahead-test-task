interface Props {
	handleImport: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const Import = ({ handleImport }: Props) => (
	<label className="rounded-md hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 text-sm cursor-pointer">
		Import
		<input
			type="file"
			accept="application/json"
			onChange={handleImport}
			className="hidden"
		/>
	</label>
);
