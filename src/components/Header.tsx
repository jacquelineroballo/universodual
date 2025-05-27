import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { CartItem } from '../types/Product'

interface HeaderProps {
	cartItems: CartItem[]
	onCartClick: () => void
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick }) => {
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<header className='bg-gradient-to-r from-mystic-lavender via-mystic-cream to-mystic-rose shadow-lg sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<Link to='/' className='flex items-center space-x-2 hover:opacity-80 transition-opacity'>
						<div className='relative'>
							<Star className='w-8 h-8 text-mystic-gold animate-float' />
							<div className='absolute -top-1 -right-1 w-3 h-3 bg-mystic-beige rounded-full'></div>
						</div>
						<div className='text-center'>
							<h1 className='font-playfair text-2xl md:text-3xl font-bold text-gray-800'>
								UNIVERSO
							</h1>
							<h2 className='font-playfair text-xl md:text-2xl font-bold text-gray-700 -mt-1'>
								DUAL
							</h2>
						</div>
					</Link>

					{/* Navegación */}
					<nav className='hidden md:flex space-x-8'>
						<Link
							to='/'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Inicio
						</Link>
						<Link
							to='/nuestra-historia'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Nuestra Historia
						</Link>
						<Link
							to='/categoria/velas'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Velas
						</Link>
						<Link
							to='/categoria/inciensos'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Inciensos
						</Link>
						<Link
							to='/categoria/cristales'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Cristales
						</Link>
						{/* <Link
							to='/categoria/accesorios'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Accesorios
						</Link> */}
					</nav>

					{/* Carrito */}
					<button
						onClick={onCartClick}
						className='relative bg-mystic-beige hover:bg-mystic-gold transition-colors p-3 rounded-full shadow-md'
					>
						<ShoppingCart className='w-6 h-6 text-gray-800' />
						{totalItems > 0 && (
							<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-montserrat font-semibold'>
								{totalItems}
							</span>
						)}
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
