import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Button } from '../components/ui/button'
import { useToast } from '../hooks/use-toast'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

const ProductDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { toast } = useToast()

	const { products, loading, error, refetch } = useProducts()
	const { cartItems, addToCart } = useCart()

	const product = products.find((p) => p.id === id) // Changed from parseInt comparison

	const handleAddToCart = () => {
		if (product) {
			addToCart(product)

			const existingItem = cartItems.find((item) => item.id === product.id)

			if (existingItem) {
				toast({
					title: 'Producto actualizado',
					description: `Se agregó otra unidad de ${product.name} al carrito`,
				})
			} else {
				toast({
					title: '¡Producto agregado!',
					description: `${product.name} se ha agregado a tu carrito mágico`,
				})
			}
		}
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />
				<ErrorMessage message={error} onRetry={refetch} />
			</div>
		)
	}

	if (!product) {
		return (
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />
				<div className='container mx-auto px-4 py-12'>
					<div className='text-center'>
						<h1 className='font-playfair text-3xl font-bold text-gray-800 mb-4'>
							Producto no encontrado
						</h1>
						<Link
							to='/'
							className='inline-flex items-center text-mystic-gold hover:text-mystic-beige transition-colors'
						>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Volver al inicio
						</Link>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-white font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<div className='container mx-auto px-4 py-8'>
				<Link
					to={`/categoria/${product.category}`}
					className='inline-flex items-center text-mystic-gold hover:text-mystic-beige transition-colors mb-6'
				>
					<ArrowLeft className='w-4 h-4 mr-2' />
					Volver a {product.category}
				</Link>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Imagen del producto */}
					<div className='relative'>
						<img
							src={product.image}
							alt={product.name}
							className='w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg'
						/>
						<div className='absolute top-4 right-4'>
							<span
								className={`px-3 py-2 rounded-full text-sm font-montserrat font-medium ${
									product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
								}`}
							>
								{product.inStock ? 'Disponible' : 'Agotado'}
							</span>
						</div>
					</div>

					{/* Información del producto */}
					<div className='space-y-6'>
						<div>
							<span className='inline-block px-3 py-1 bg-mystic-lavender text-gray-700 text-sm font-montserrat rounded-full mb-4 capitalize'>
								{product.category}
							</span>

							<h1 className='font-playfair text-4xl font-bold text-gray-800 mb-4'>
								{product.name}
							</h1>

							<p className='font-montserrat text-lg text-gray-600 leading-relaxed'>
								{product.description}
							</p>
						</div>

						<div className='border-t border-mystic-lavender/30 pt-6'>
							<div className='flex items-center justify-between mb-6'>
								<span className='font-montserrat text-3xl font-bold text-mystic-gold'>
									${product.price.toFixed(2)}
								</span>
							</div>

							<Button
								onClick={handleAddToCart}
								disabled={!product.inStock}
								className='w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-medium py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<ShoppingCart className='w-5 h-5 mr-2' />
								{product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailPage
