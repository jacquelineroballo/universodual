import React, { memo } from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
import { Product } from '../types/Product'
import { Button } from './ui/button'

interface ProductCardProps {
	product: Product
	onAddToCart: () => void
	onViewProduct?: () => void
	quantity?: number
	loading?: boolean
}

const OptimizedProductCard = memo<ProductCardProps>(
	({ product, onAddToCart, onViewProduct, quantity = 0, loading = false }) => {
		return (
			<article
				className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105'
				role='article'
				aria-labelledby={`product-${product.id}-title`}
			>
				<div className='relative group'>
					<img
						src={product.image}
						alt={`${product.name} - Producto esotérico`}
						className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110'
						loading='lazy'
					/>
					<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
						{onViewProduct && (
							<Button
								onClick={onViewProduct}
								size='sm'
								variant='secondary'
								className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2'
								aria-label={`Ver detalles de ${product.name}`}
							>
								<Eye className='w-4 h-4' />
							</Button>
						)}
					</div>
					{!product.inStock && (
						<div className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded'>
							Sin Stock
						</div>
					)}
					{quantity > 0 && (
						<div
							className='absolute top-2 left-2 bg-mystic-gold text-gray-800 text-xs px-2 py-1 rounded-full font-medium'
							aria-label={`${quantity} en el carrito`}
						>
							{quantity}
						</div>
					)}
				</div>

				<div className='p-4'>
					<div className='mb-2'>
						<span className='inline-block bg-mystic-lavender/20 text-mystic-purple text-xs px-2 py-1 rounded-full font-medium capitalize'>
							{product.category}
						</span>
					</div>

					<h3
						id={`product-${product.id}-title`}
						className='font-playfair text-lg font-semibold text-gray-800 mb-2 line-clamp-2'
					>
						{product.name}
					</h3>

					<p className='font-montserrat text-gray-600 text-sm mb-4 line-clamp-3'>
						{product.description}
					</p>

					<div className='flex items-center justify-between'>
						<span
							className='font-playfair text-xl font-bold text-mystic-gold'
							aria-label={`Precio: ${product.price} pesos`}
						>
							${product.price.toFixed(2)}
						</span>

						<Button
							onClick={onAddToCart}
							disabled={!product.inStock || loading}
							size='sm'
							className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-medium disabled:opacity-50 disabled:cursor-not-allowed'
							aria-label={`Agregar ${product.name} al carrito`}
						>
							<ShoppingCart className='w-4 h-4 mr-1' />
							{loading ? 'Agregando...' : 'Agregar'}
						</Button>
					</div>
				</div>
			</article>
		)
	}
)

OptimizedProductCard.displayName = 'OptimizedProductCard'

export default OptimizedProductCard
