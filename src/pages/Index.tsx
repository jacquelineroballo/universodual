import React, { useState } from 'react'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'
import { useProducts } from '../hooks/useProducts'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Product } from '@/types/Product'

const Index = () => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
		useCarrito()
	const { products, loading, error } = useProducts()

	if (loading) {
		return <LoadingSpinner />
	}

	if (error) {
		return <ErrorMessage message={error} />
	}

	const handleAddToCart = (product: Product) => {
		addToCart(product)
	}

	const handleViewProduct = (productId: string) => {
		// Navigation logic for viewing individual product
		console.log('View product:', productId)
	}

	const scrollToProducts = () => {
		const element = document.getElementById('productos')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div className='min-h-screen bg-white font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

			<main>
				<Hero onShopNowClick={scrollToProducts} />

				<section id='productos' className='py-16 bg-gray-50'>
					<div className='container mx-auto px-4'>
						<h2 className='font-playfair text-3xl font-bold text-center text-gray-800 mb-12'>
							Nuestros Productos
						</h2>
						<ProductList
							products={products}
							onAddToCart={handleAddToCart}
							onViewProduct={handleViewProduct}
						/>
					</div>
				</section>

				{/* Contact Section */}
				<section id='contacto' className='py-16 bg-mystic-lavender'>
					<div className='container mx-auto px-4 text-center'>
						<h2 className='font-playfair text-3xl font-bold text-gray-800 mb-8'>Contacto</h2>
						<p className='font-montserrat text-gray-600 max-w-2xl mx-auto mb-8'>
							¿Tienes alguna pregunta sobre nuestros productos místicos? Estamos aquí para ayudarte
							en tu viaje espiritual.
						</p>
						<div className='space-y-4'>
							<p className='font-montserrat text-gray-700'>📧 Email: info@universodual.com</p>
							<p className='font-montserrat text-gray-700'>📱 WhatsApp: +54 9 11 1234-5678</p>
							<p className='font-montserrat text-gray-700'>
								🕐 Horarios: Lunes a Viernes 9:00 - 18:00
							</p>
						</div>
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
	)
}

export default Index
