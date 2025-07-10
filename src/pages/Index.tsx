import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import Header from '../components/Header'
import SEO from '../components/SEO'
import { useCarrito } from '../contexts/CarritoContext'
import { useProducts } from '../hooks/useProducts'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const Index = () => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
		useCarrito()
	const { products, loading, error } = useProducts()

	if (loading) {
		return (
			<>
				<SEO />
				<LoadingSpinner />
			</>
		)
	}

	if (error) {
		return (
			<>
				<SEO />
				<ErrorMessage message={error} />
			</>
		)
	}

	const handleAddToCart = (productId: string) => {
		const product = products.find((p) => p.id === productId)
		if (product) {
			addToCart(product)
		}
	}

	const handleViewProduct = (productId: string) => {
		console.log('View product:', productId)
	}

	const scrollToProducts = () => {
		const element = document.getElementById('productos')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	// Show only featured products or first 8 products for homepage
	const featuredProducts = products.filter((p) => p.featured).slice(0, 8)
	const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8)

	return (
		<>
			<SEO />
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

				<main role='main'>
					<Hero onShopNowClick={scrollToProducts} />

					<section id='productos' className='py-16 bg-gray-50' aria-labelledby='productos-heading'>
						<div className='container mx-auto px-4'>
							<div className='text-center mb-12'>
								<h2
									id='productos-heading'
									className='font-playfair text-3xl font-bold text-gray-800 mb-4'
								>
									Productos Destacados
								</h2>
								<p className='font-montserrat text-gray-600 max-w-2xl mx-auto mb-8'>
									Descubre nuestra selección especial de productos más populares
								</p>
							</div>

							<ProductList
								products={displayProducts}
								onAddToCart={handleAddToCart}
								onViewProduct={handleViewProduct}
							/>

							<div className='text-center mt-12'>
								<Link
									to='/productos'
									className='inline-block bg-gradient-to-r from-mystic-beige to-mystic-gold hover:from-mystic-gold hover:to-mystic-rose text-gray-800 font-montserrat font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105'
									aria-label='Ver todos los productos del catálogo'
								>
									Ver Todo el Catálogo
								</Link>
							</div>
						</div>
					</section>

					<section className='py-16 bg-mystic-lavender' aria-labelledby='contact-heading'>
						<div className='container mx-auto px-4 text-center'>
							<h2
								id='contact-heading'
								className='font-playfair text-3xl font-bold text-gray-800 mb-8'
							>
								¿Necesitas ayuda?
							</h2>
							<p className='font-montserrat text-gray-600 max-w-2xl mx-auto mb-8'>
								Estamos aquí para acompañarte en tu viaje espiritual. Contáctanos para cualquier
								consulta sobre nuestros productos místicos.
							</p>
							<Link
								to='/contacto'
								className='inline-block bg-gradient-to-r from-mystic-rose to-mystic-gold text-gray-800 font-montserrat font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105'
								aria-label='Ir a la página de contacto'
							>
								Contáctanos
							</Link>
						</div>
					</section>
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

export default Index
