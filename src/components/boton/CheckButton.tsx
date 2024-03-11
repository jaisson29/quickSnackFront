import { useState } from 'react';

type Props = {
	title: string;
	active: boolean;
	action: (...data: any) => void;
};

const CheckButton = ({ title, active, action }: Props) => {
	const [isActive, setIsActive] = useState<boolean>(active);

	const toggle = () => {
		action();
		setIsActive((last) => !last);
	};

	return (
		<button title={title} className={`h-10 w-10 rounded-full text-lg text-clBlan ${isActive ? 'bg-green-500/60': 'bg-red-600/60'}`} onClick={toggle}>
			<i className={`fa ${isActive ? 'fa-check' : 'fa-x'}`}></i>
		</button>
	);
};

export { CheckButton };
