import React, { ErrorInfo, ReactElement, ReactNode } from 'react';
import Button from '../boton/Button';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
	children?: ReactNode;
}

type ErrorFallback = ReactElement | ReactNode;
interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error, errorInfo);
		this.setState({ hasError: true });
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<>
					<h1>Algo salió mal.</h1>
					<Button>
						<Link to='/'>
							<i className='fa-soli fa-close'></i> Cerrar sesión
						</Link>
					</Button>
				</>
			);
		}

		return this.props.children;
	}
}

