import React from 'react'
import { Product } from '../types/Product'
import ProductCard from './ProductCard'
import { Button } from './ui/button'

interface ProductsGridProps {
	products: Product[]
	onAddToCart: (productId: string) => void
	onClearFilters: () => void
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, onAddToCart, onClearFilters }) => {
	if (products.length === 0) {
		return (
			<div className='text-center py-16' role='status' aria-live='polite'>
				<div className='max-w-md mx-auto px-4'>
					<h2 className='font-playfair text-xl sm:text-2xl font-semibold text-gray-700 mb-4'>
						No se encontraron productos
					</h2>
					<p className='font-montserrat text-gray-500 mb-6 text-sm sm:text-base'>
						Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas.
					</p>
					<Button
						onClick={onClearFilters}
						className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat transition-colors duration-200'
					>
						Limpiar filtros
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8'
			role='grid'
			aria-label='Lista de productos'
		>
			{products.map((product) => (
				<div key={product.id} role='gridcell'>
					<ProductCard product={product} onAddToCart={() => onAddToCart(product.id)} />
				</div>
			))}
		</div>
	)
}

export default ProductsGrid
