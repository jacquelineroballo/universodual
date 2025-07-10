import React from 'react'
import { useProducts } from '../hooks/useProducts'
import { useProductSearch } from '../hooks/useProductSearch'
import { useOptimizedCart } from '../hooks/useOptimizedCart'
import Header from '../components/Header'
import SEO from '../components/SEO'
import ProductsHeader from '../components/ProductsHeader'
import ProductsFilters from '../components/ProductsFilters'
import ProductsGrid from '../components/ProductsGrid'
import ProductsPagination from '../components/ProductsPagination'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import Cart from '../components/Cart'
import { useToast } from '../hooks/use-toast'

const ProductsPage: React.FC = () => {
	const { toast } = useToast()

	const { products, loading, error, refetch } = useProducts()
	const {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		totalPrice,
		isCartOpen,
		setCartOpen,
	} = useOptimizedCart()

	const {
		searchTerm,
		currentPage,
		selectedCategory,
		paginatedProducts,
		totalPages,
		totalResults,
		handleSearchChange,
		handleCategoryChange,
		handlePageChange,
	} = useProductSearch(products, 4) // Cambié a 4 productos por página

	const handleAddToCart = (productId: string) => {
		const product = products.find((p) => p.id === productId)
		if (product) {
			addToCart(product)
			const existingItem = cartItems.find((item) => item.id === product.id)

			toast({
				title: existingItem ? 'Producto actualizado' : '¡Producto agregado!',
				description: existingItem
					? `Se agregó otra unidad de ${product.name} al carrito`
					: `${product.name} se ha agregado a tu carrito mágico`,
			})
		}
	}

	const handleClearFilters = () => {
		handleSearchChange('')
		handleCategoryChange('')
	}

	if (loading) {
		return (
			<>
				<SEO title='Cargando productos...' />
				<div className='min-h-screen bg-white font-montserrat'>
					<Header cartItems={cartItems} onCartClick={() => setCartOpen(true)} />
					<LoadingSpinner />
				</div>
			</>
		)
	}

	if (error) {
		return (
			<>
				<SEO title='Error al cargar productos' />
				<div className='min-h-screen bg-white font-montserrat'>
					<Header cartItems={cartItems} onCartClick={() => setCartOpen(true)} />
					<ErrorMessage message={error} onRetry={refetch} />
				</div>
			</>
		)
	}

	return (
		<>
			<SEO
				title='Todos los Productos - Catálogo Completo'
				description='Explora nuestro catálogo completo de productos esotéricos: velas artesanales, inciensos sagrados, cristales mágicos y accesorios místicos.'
				keywords='catálogo productos esotéricos, velas artesanales, inciensos, cristales, accesorios místicos, tienda online'
			/>

			<div className='min-h-screen bg-gradient-to-br from-mystic-cream via-mystic-lavender/10 to-mystic-beige/20 font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => setCartOpen(true)} />

				<main className='container mx-auto px-4 py-8' role='main'>
					<ProductsHeader />

					<ProductsFilters
						searchTerm={searchTerm}
						selectedCategory={selectedCategory}
						totalResults={totalResults}
						paginatedProductsLength={paginatedProducts.length}
						onSearchChange={handleSearchChange}
						onCategoryChange={handleCategoryChange}
					/>

					<ProductsGrid products={paginatedProducts} onClearFilters={handleClearFilters} />

					<ProductsPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</main>

				<Cart
					isOpen={isCartOpen}
					onClose={() => setCartOpen(false)}
					items={cartItems}
					onUpdateQuantity={updateQuantity}
					onRemoveItem={removeFromCart}
					onClearCart={clearCart}
					totalPrice={totalPrice}
				/>
			</div>
		</>
	)
}

export default ProductsPage
