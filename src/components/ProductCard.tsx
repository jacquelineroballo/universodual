import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'
import { Button } from './ui/button'

interface ProductCardProps {
	product: Product
	onAddToCart: () => void
	onViewProduct?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct }) => {
	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-mystic-lavender/20'>
			<div className='relative'>
				<Link to={`/producto/${product.id}`}>
					<img
						src={product.image}
						alt={product.name}
						className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
					/>
				</Link>
				<div className='absolute top-2 right-2'>
					<span
						className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
							product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
						}`}
					>
						{product.inStock ? 'Disponible' : 'Agotado'}
					</span>
				</div>
			</div>

			<div className='p-4'>
				<Link to={`/producto/${product.id}`}>
					<h3 className='font-playfair text-lg font-semibold text-gray-800 mb-2 hover:text-mystic-gold transition-colors'>
						{product.name}
					</h3>
				</Link>
				<p className='font-montserrat text-sm text-gray-600 mb-3 line-clamp-2'>
					{product.description}
				</p>

				<div className='flex items-center justify-between'>
					<span className='font-montserrat text-xl font-bold text-mystic-gold'>
						${product.price.toFixed(2)}
					</span>

					<Button
						onClick={onAddToCart}
						disabled={!product.inStock}
						className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-medium disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{product.inStock ? 'Agregar' : 'Sin stock'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
