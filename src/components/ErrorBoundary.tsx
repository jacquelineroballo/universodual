import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error: Error | null
	errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		}
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
			errorInfo: null,
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Error caught by boundary:', error, errorInfo)

		this.setState({
			error,
			errorInfo,
		})

		// Here you could send the error to a logging service
		if (process.env.NODE_ENV === 'production') {
			// Example: Send to error reporting service
			// errorReportingService.captureException(error, { extra: errorInfo });
		}
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		})
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className='min-h-screen bg-gradient-to-br from-mystic-cream via-mystic-lavender/10 to-mystic-beige/20 flex items-center justify-center p-4'>
					<div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
						<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
							<AlertTriangle className='text-red-600 w-8 h-8' />
						</div>

						<h1 className='font-playfair text-2xl font-bold text-gray-800 mb-2'>
							¡Oops! Algo salió mal
						</h1>

						<p className='font-montserrat text-gray-600 mb-6'>
							Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
						</p>

						<div className='space-y-3'>
							<Button
								onClick={this.handleReset}
								className='w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat'
							>
								<RefreshCw className='w-4 h-4 mr-2' />
								Intentar nuevamente
							</Button>

							<Button onClick={() => window.location.reload()} variant='outline' className='w-full'>
								Recargar página
							</Button>
						</div>

						{process.env.NODE_ENV === 'development' && (
							<details className='mt-6 text-left'>
								<summary className='cursor-pointer text-sm text-gray-500 hover:text-gray-700'>
									Detalles del error (desarrollo)
								</summary>
								<div className='mt-2 p-4 bg-gray-50 rounded text-xs text-gray-700 overflow-auto max-h-40'>
									<strong>Error:</strong> {this.state.error?.toString()}
									<br />
									<strong>Stack:</strong>
									<pre className='whitespace-pre-wrap mt-1'>
										{this.state.errorInfo?.componentStack}
									</pre>
								</div>
							</details>
						)}
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
