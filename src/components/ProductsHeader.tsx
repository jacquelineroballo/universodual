import React from 'react'

const ProductsHeader: React.FC = () => {
	return (
		<div className='text-center mb-12'>
			<h1 className='font-playfair text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
				Nuestro Catálogo Mágico
			</h1>
			<div className='w-32 h-1 bg-gradient-to-r from-mystic-rose to-mystic-gold mx-auto mb-6'></div>
			<p className='font-montserrat text-gray-600 max-w-3xl mx-auto text-lg'>
				Descubre nuestra colección completa de productos artesanales, cada uno cuidadosamente
				seleccionado para elevar tu energía espiritual.
			</p>
		</div>
	)
}

export default ProductsHeader
