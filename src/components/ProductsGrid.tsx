import React, { memo } from 'react'
import { Product } from '../types/Product'
import OptimizedProductCard from './OptimizedProductCard'
import { Button } from './ui/button'
import { useOptimizedCart } from '../hooks/useOptimizedCart'

interface ProductsGridProps {
	products: Product[]
	onClearFilters: () => void
}

const ProductsGrid = memo<ProductsGridProps>(({ products, onClearFilters }) => {
	const { addToCart, getItemQuantity } = useOptimizedCart()

	const handleAddToCart = React.useCallback(
		(productId: string) => {
			const product = products.find((p) => p.id === productId)
			if (product) {
				addToCart(product)
			}
		},
		[products, addToCart]
	)

	if (products.length === 0) {
		return (
			<div className='text-center py-16' role='status' aria-live='polite'>
				<div className='max-w-md mx-auto'>
					<h2 className='font-playfair text-2xl font-semibold text-gray-700 mb-4'>
						No se encontraron productos
					</h2>
					<p className='font-montserrat text-gray-500 mb-6'>
						Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas.
					</p>
					<Button
						onClick={onClearFilters}
						className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat'
					>
						Limpiar filtros
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'
			role='grid'
			aria-label='Lista de productos'
		>
			{products.map((product) => (
				<div key={product.id} role='gridcell'>
					<OptimizedProductCard
						product={product}
						onAddToCart={() => handleAddToCart(product.id)}
						quantity={getItemQuantity(product.id)}
					/>
				</div>
			))}
		</div>
	)
})

ProductsGrid.displayName = 'ProductsGrid'

export default ProductsGrid
