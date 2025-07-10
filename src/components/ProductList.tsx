import React, { memo } from 'react'
import { Product } from '../types/Product'
import OptimizedProductCard from './OptimizedProductCard'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { useOptimizedCart } from '../hooks/useOptimizedCart'

interface ProductListProps {
	products: Product[]
	onViewProduct?: (productId: string) => void
	loading?: boolean
	error?: string | null
	onRetry?: () => void
	showPagination?: boolean
	currentPage?: number
	totalPages?: number
	onPageChange?: (page: number) => void
}

const ProductList = memo<ProductListProps>(
	({
		products,
		onViewProduct,
		loading = false,
		error = null,
		onRetry,
		showPagination = false,
		currentPage = 1,
		totalPages = 1,
		onPageChange,
	}) => {
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

		return (
			<section
				className='py-12 bg-gradient-to-br from-mystic-cream via-mystic-lavender/20 to-mystic-beige/30'
				role='region'
				aria-labelledby='products-section-title'
			>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-12'>
						<h2
							id='products-section-title'
							className='font-playfair text-4xl font-bold text-gray-800 mb-4'
						>
							Nuestros Productos Mágicos
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-mystic-rose to-mystic-gold mx-auto mb-6'></div>
						<p className='font-montserrat text-gray-600 max-w-2xl mx-auto'>
							Descubre nuestra selección artesanal de velas, inciensos y cristales, cada uno
							cuidadosamente elaborado para elevar tu energía espiritual.
						</p>
					</div>

					{loading && (
						<div role='status' aria-label='Cargando productos'>
							<LoadingSpinner />
						</div>
					)}

					{error && !loading && (
						<div role='alert'>
							<ErrorMessage message={error} onRetry={onRetry} />
						</div>
					)}

					{!loading && !error && products.length === 0 && (
						<div className='text-center py-12' role='status'>
							<p className='font-montserrat text-gray-500 text-lg'>
								No hay productos disponibles en este momento.
							</p>
						</div>
					)}

					{!loading && !error && products.length > 0 && (
						<>
							<div
								className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'
								role='grid'
								aria-label='Lista de productos'
							>
								{products.map((product) => (
									<div key={product.id} role='gridcell'>
										<OptimizedProductCard
											product={product}
											onAddToCart={() => handleAddToCart(product.id)}
											onViewProduct={onViewProduct ? () => onViewProduct(product.id) : undefined}
											quantity={getItemQuantity(product.id)}
										/>
									</div>
								))}
							</div>

							{showPagination && totalPages > 1 && (
								<nav
									className='flex justify-center mt-8'
									role='navigation'
									aria-label='Paginación de productos'
								>
									<div className='flex space-x-2'>
										<button
											onClick={() => onPageChange && onPageChange(currentPage - 1)}
											disabled={currentPage === 1}
											className='px-4 py-2 bg-mystic-beige hover:bg-mystic-gold disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-montserrat transition-colors'
											aria-label='Página anterior'
										>
											Anterior
										</button>

										{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
											const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
											return (
												<button
													key={pageNumber}
													onClick={() => onPageChange && onPageChange(pageNumber)}
													className={`px-4 py-2 rounded-lg font-montserrat transition-colors ${
														currentPage === pageNumber
															? 'bg-mystic-gold text-gray-800'
															: 'bg-mystic-beige hover:bg-mystic-gold text-gray-700'
													}`}
													aria-label={`Ir a la página ${pageNumber}`}
													aria-current={currentPage === pageNumber ? 'page' : undefined}
												>
													{pageNumber}
												</button>
											)
										})}

										<button
											onClick={() => onPageChange && onPageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
											className='px-4 py-2 bg-mystic-beige hover:bg-mystic-gold disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-montserrat transition-colors'
											aria-label='Página siguiente'
										>
											Siguiente
										</button>
									</div>
								</nav>
							)}
						</>
					)}
				</div>
			</section>
		)
	}
)

ProductList.displayName = 'ProductList'

export default ProductList
