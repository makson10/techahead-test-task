import { Children, Fragment, type PropsWithChildren } from 'react';

const Divider = () => (
	<div className="w-full h-[3px] bg-gray-300 my-6 rounded-4xl" />
);

const UnitWrapper = ({ children }: PropsWithChildren) => {
	return (
		<div>
			{Children.map(children, (child, index) => (
				<Fragment key={index}>
					{index !== 0 && <Divider />}
					{child}
				</Fragment>
			))}
		</div>
	);
};

export default UnitWrapper;
