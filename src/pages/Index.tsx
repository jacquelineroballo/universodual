import React, { useState } from 'react'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'
import { useProducts } from '../hooks/useProducts'
import { Product } from '../types/Product'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Link } from 'react-router-dom'

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

	const handleAddToCart = (productId: string) => {
		const product = products.find((p) => p.id === productId)
		if (product) {
			addToCart(product)
		}
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

				{/* Footer */}
				<footer className='bg-mystic-lavender py-5'>
					<div className='container mx-auto px-4 text-center'>
						<h3 className='font-playfair text-2xl font-bold text-gray-800 mb-2'>
							Universo Dual ✨
						</h3>
						<p className='font-montserrat text-gray-600 mb-6'>
							Conectando tu alma con la magia del universo⭐
						</p>
						<Link
							to='/contacto'
							className='inline-block btn-sm bg-gradient-to-r from-mystic-rose to-mystic-gold text-gray-800 font-montserrat font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105'
						>
							Contáctanos
						</Link>
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
		</div>
	)
}

export default Index
