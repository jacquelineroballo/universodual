import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useOptimizedCart } from '../hooks/useOptimizedCart'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import { useToast } from '../hooks/use-toast'
import { ArrowLeft } from 'lucide-react'

const CategoryPage: React.FC = () => {
	const { category } = useParams<{ category: string }>()
	const { toast } = useToast()

	const { products, loading, error, refetch } = useProducts()
	const { cartItems, addToCart, updateQuantity, removeFromCart, setCartOpen } = useOptimizedCart()

	// Filtrar productos por categoría
	const filteredProducts = products.filter((product) => product.category === category)

	const handleAddToCart = (product: any) => {
		addToCart(product)

		const existingItem = cartItems.find((item) => item.id === product.id)

		if (existingItem) {
			toast({
				title: 'Producto actualizado',
				description: `Se agregó otra unidad de ${product.name} al carrito`,
			})
		} else {
			toast({
				title: '¡Producto agregado!',
				description: `${product.name} se ha agregado a tu carrito mágico`,
			})
		}
	}

	const getCategoryTitle = (cat: string) => {
		const titles: { [key: string]: string } = {
			velas: 'Velas Artesanales',
			inciensos: 'Inciensos Sagrados',
			cristales: 'Cristales Mágicos',
			accesorios: 'Accesorios Místicos',
		}
		return titles[cat] || 'Productos'
	}

	const getCategoryDescription = (cat: string) => {
		const descriptions: { [key: string]: string } = {
			velas:
				'Velas artesanales creadas con ceras naturales y aceites esenciales para elevar tu energía espiritual',
			inciensos:
				'Inciensos sagrados elaborados con hierbas y resinas naturales para purificar y armonizar espacios',
			cristales:
				'Cristales mágicos naturales seleccionados por sus propiedades energéticas y espirituales',
			accesorios:
				'Accesorios místicos únicos para complementar tu práctica espiritual y meditativa',
		}
		return descriptions[cat] || 'Productos esotéricos de alta calidad'
	}

	const categoryTitle = getCategoryTitle(category || '')
	const categoryDescription = getCategoryDescription(category || '')

	return (
		<>
			<SEO
				title={`${categoryTitle} - Categoría`}
				description={categoryDescription}
				keywords={`${category}, ${categoryTitle.toLowerCase()}, productos esotéricos, tienda mística`}
			/>

			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => setCartOpen(true)} />

				<main className='container mx-auto px-4 py-8' role='main'>
					<div className='mb-8'>
						<nav aria-label='Breadcrumb' className='mb-4'>
							<Link
								to='/'
								className='inline-flex items-center text-mystic-gold hover:text-mystic-beige transition-colors'
							>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Volver al inicio
							</Link>
						</nav>

						<h1 className='font-playfair text-4xl font-bold text-gray-800 mb-4'>{categoryTitle}</h1>

						<p className='font-montserrat text-gray-600 max-w-2xl'>{categoryDescription}</p>
					</div>

					<ProductList
						products={filteredProducts}
						loading={loading}
						error={error}
						onRetry={refetch}
					/>
				</main>
			</div>
		</>
	)
}

export default CategoryPage
