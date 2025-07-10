import React, { Component, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-mystic-cream to-mystic-lavender/10'>
					<div className='text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4'>
						<h1 className='text-2xl font-playfair font-bold text-gray-800 mb-4'>
							¡Oops! Algo salió mal
						</h1>
						<p className='text-gray-600 font-montserrat mb-6'>
							Ha ocurrido un error inesperado. Por favor, recarga la página.
						</p>
						<button
							onClick={() => window.location.reload()}
							className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-semibold px-6 py-2 rounded-lg transition-colors'
						>
							Recargar página
						</button>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
