import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import Header from '../components/Header'
import SEO from '../components/SEO'
import { useCarrito } from '../contexts/CarritoContext'
import { ProductsProvider, useProducts } from '../contexts/ProductsContext'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useToast } from '../hooks/use-toast'

const IndexContent = () => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { toast } = useToast()
	const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
		useCarrito()
	const { products, loading, error, fetchProducts } = useProducts()

	if (loading) {
		return (
			<>
				<SEO />
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
				<SEO />
				<div className='min-h-screen bg-white font-montserrat'>
					<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
					<ErrorMessage message={error} onRetry={fetchProducts} />
				</div>
			</>
		)
	}

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

	const scrollToProducts = () => {
		const element = document.getElementById('productos')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	// Transform MockProducts to Products for display
	const featuredProducts = products.filter((p) => p.featured)
	const otherProducts = products.filter((p) => !p.featured)

	const productsToShow = [...featuredProducts, ...otherProducts].slice(0, 8)

	function handleViewProduct(productId: string): void {
		throw new Error('Function not implemented.')
	}

	return (
		<>
			<SEO />
			<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
			<main role='main'>
				<Hero onShopNowClick={scrollToProducts} />
				<section id='productos' aria-labelledby='productos-heading'>
					<div className='container mx-auto px-0'>
						<ProductList
							products={productsToShow}
							onAddToCart={handleAddToCart}
							onViewProduct={handleViewProduct}
							loading={loading}
							error={error}
							onRetry={fetchProducts}
						/>

						{productsToShow.length > 0 && (
							<div className='bg-white text-center py-5'>
								<Link
									to='/productos'
									className='inline-block bg-gradient-to-r from-mystic-beige to-mystic-gold hover:from-mystic-gold hover:to-mystic-rose text-gray-800 font-montserrat px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105'
									aria-label='Ver todos los productos del catálogo'
								>
									Ver +{products.length} productos
								</Link>
							</div>
						)}
					</div>
				</section>

				{/* Footer */}
				<footer className='bg-mystic-lavender/30 py-5'>
					<div className='container mx-auto px-4 text-center'>
						<h3 className='font-playfair text-2xl font-bold text-gray-800 mb-2'>
							Universo Dual ✨
						</h3>
						<p className='font-montserrat text-gray-600 mb-6'>
							Conectando tu alma con la magia del universo⭐
						</p>
						<div className='flex justify-center space-x-6 text-sm text-gray-500 mb-2'>
							<span> Universo Dual 2025 © Todos los derechos reservados</span>
						</div>
						<div className='flex justify-center space-x-6 text-sm text-gray-500'>
							Creado por Jacqueline <div className='animate-bounce'>💖</div>
						</div>
					</div>
				</footer>
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
		</>
	)
}

const Index = () => {
	return (
		<ProductsProvider>
			<IndexContent />
		</ProductsProvider>
	)
}

export default Index
