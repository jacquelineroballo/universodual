import React, { useState } from 'react'
import { useProductSearch } from '../hooks/useProductSearch'
import { useCarrito } from '../contexts/CarritoContext'
import { ProductsProvider, useProducts } from '../contexts/ProductsContext'
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

const ProductsPageContent: React.FC = () => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { toast } = useToast()

	const { products, loading, error, fetchProducts } = useProducts()
	const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
		useCarrito()

	// Transform MockProducts to Products for search hook
	const transformedProducts = products.map((product) => ({
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.image,
		description: product.description,
		category: product.category as 'velas' | 'inciensos' | 'cristales' | 'accesorios',
		inStock: product.stock > 0,
		stock: product.stock,
		featured: product.featured,
	}))

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
	} = useProductSearch(transformedProducts, 12)

	const handleAddToCart = (productId: string) => {
		const product = transformedProducts.find((p) => p.id === productId)
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
					<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
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
					<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
					<ErrorMessage message={error} onRetry={fetchProducts} />
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
				<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

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

					<ProductsGrid
						products={paginatedProducts}
						onAddToCart={handleAddToCart}
						onClearFilters={handleClearFilters}
					/>

					<ProductsPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</main>

				<Cart
					isOpen={isCartOpen}
					onClose={() => setIsCartOpen(false)}
					items={cartItems}
					onUpdateQuantity={updateQuantity}
					onRemoveItem={removeFromCart}
					onClearCart={clearCart}
					totalPrice={getTotalPrice()}
				/>
			</div>
		</>
	)
}

const ProductsPage: React.FC = () => {
	return (
		<ProductsProvider>
			<ProductsPageContent />
		</ProductsProvider>
	)
}

export default ProductsPage
