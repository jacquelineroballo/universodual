import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'
import ProductsAdmin from '../components/ProductsAdmin'

const ProductManagementPage: React.FC = () => {
	const { user, loading: authLoading } = useAuth()
	const navigate = useNavigate()
	const { cartItems } = useCarrito()

	// Verificar permisos - tanto super admin como admin pueden acceder
	useEffect(() => {
		if (
			!authLoading &&
			(!user || (user.email !== 'admin@universodual.com' && user.role !== 'admin'))
		) {
			navigate('/')
		}
	}, [user, authLoading, navigate])

	if (authLoading) {
		return (
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />
				<div className='flex items-center justify-center min-h-[400px]'>
					<div className='text-center'>Cargando...</div>
				</div>
			</div>
		)
	}

	if (!user || (user.email !== 'admin@universodual.com' && user.role !== 'admin')) {
		return null
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-lavender via-mystic-cream to-mystic-rose font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-8'>
				<div className='max-w-7xl mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/admin')}
							className='p-2 hover:bg-white rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<div>
							<h1 className='font-playfair text-3xl font-bold text-gray-800'>
								Gestión de Productos
							</h1>
							<p className='text-gray-600 mt-2'>Administra el catálogo completo de productos</p>
						</div>
					</div>

					{/* Products Admin Component */}
					<ProductsAdmin />
				</div>
			</main>
		</div>
	)
}

export default ProductManagementPage
