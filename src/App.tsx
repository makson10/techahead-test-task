import Form from './components/form/Form';

const App = () => {
	return (
		<div className="min-h-dvh bg-gray-50">
			<div className="mx-auto max-w-2xl px-4 py-8">
				<h1 className="mb-6 text-2xl font-semibold text-gray-900 text-center">
					NYC TC108
				</h1>
				<Form />
			</div>
		</div>
	);
};

export default App;
