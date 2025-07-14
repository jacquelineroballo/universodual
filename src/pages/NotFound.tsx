import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
	const location = useLocation()

	useEffect(() => {
		console.error('404 Error: User attempted to access non-existent route:', location.pathname)
	}, [location.pathname])

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-mystic-lavender via-mystic-cream to-mystic-rose'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold mb-4'>404</h1>
				<p className='text-xl text-gray-600 mb-4'>Oops! Esta página no existe</p>
				<a href='/' className='text-blue-500 hover:text-blue-700 underline'>
					Return to Home
				</a>
			</div>
		</div>
	)
}

export default NotFound
