import React from 'react'
import { Product } from '../types/Product'
import ProductCard from './ProductCard'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

interface ProductListProps {
	products: Product[]
	onAddToCart: (productId: string) => void
	onViewProduct?: (productId: string) => void
	loading?: boolean
	error?: string | null
	onRetry?: () => void
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onAddToCart,
	onViewProduct,
	loading = false,
	error = null,
	onRetry,
}) => {
	return (
		<section className='bg-gradient-to-br from-mystic-cream via-mystic-rose to-mystic-lavander py-10'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='font-playfair text-4xl font-bold text-gray-800 mb-4'>
						Nuestros Productos Mágicos
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-mystic-rose to-mystic-gold mx-auto mb-6'></div>
					<p className='font-montserrat text-gray-600 max-w-2xl mx-auto'>
						Descubre nuestra selección artesanal de velas, inciensos y cristales, cada uno
						cuidadosamente elaborado para elevar tu energía espiritual.
					</p>
				</div>

				{loading && <LoadingSpinner />}

				{error && !loading && <ErrorMessage message={error} onRetry={onRetry} />}

				{!loading && !error && products.length === 0 && (
					<div className='text-center py-12'>
						<p className='font-montserrat text-gray-500 text-lg'>
							No hay productos disponibles en este momento.
						</p>
					</div>
				)}

				{!loading && !error && products.length > 0 && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onAddToCart={() => onAddToCart(product.id)}
								onViewProduct={onViewProduct ? () => onViewProduct(product.id) : undefined}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export default ProductList
