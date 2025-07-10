import React from 'react'
import { ProductsProvider } from '../contexts/ProductsContext'
import ProductsAdmin from '../components/ProductsAdmin'
import Header from '../components/Header'
import SEO from '../components/SEO'
import { useCarrito } from '../contexts/CarritoContext'

const AdminPage: React.FC = () => {
	const { cartItems } = useCarrito()

	return (
		<>
			<SEO
				title='Administración de Productos'
				description='Panel de administración para gestionar el catálogo de productos'
			/>

			<div className='min-h-screen bg-gradient-to-br from-mystic-cream via-mystic-lavender/10 to-mystic-beige/20 font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />

				<main className='container mx-auto px-4 py-8'>
					<ProductsProvider>
						<ProductsAdmin />
					</ProductsProvider>
				</main>
			</div>
		</>
	)
}

export default AdminPage
