import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { CartItem } from '../types/Product'
import { Button } from './ui/button'
import AuthButton from './AuthButton'

interface HeaderProps {
	cartItems: CartItem[]
	onCartClick: () => void
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick }) => {
	const navigate = useNavigate()
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	const scrollToProducts = () => {
		const element = document.getElementById('productos')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		} else {
			// If we're not on the homepage, navigate there and then scroll
			navigate('/#productos')
		}
	}

	return (
		<header className='bg-gradient-to-r from-mystic-lavender via-mystic-cream to-mystic-rose shadow-lg sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-2'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<Link to='/' className='flex items-center space-x-2 hover:opacity-80 transition-opacity'>
						<div className='relative'>
							<Star className='w-8 h-8 text-mystic-beige hover:text-mystic-gold transition-colors animate-float' />
						</div>
						<div className='text-center'>
							<h1 className='font-playfair text-2xl md:text-3xl font-bold text-gray-800'>
								Universo Dual
							</h1>
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
							to='/contacto'
							className='font-montserrat text-gray-700 hover:text-mystic-gold transition-colors'
						>
							Contacto
						</Link>
					</nav>

					{/* Carrito */}
					<div className='flex items-center space-x-4'>
						<AuthButton />
						<Button
							onClick={onCartClick}
							className='relative bg-mystic-beige hover:bg-mystic-gold transition-colors p-2 rounded-full shadow-md'
							size='sm'
						>
							<ShoppingCart className='w-4 h-4 text-gray-800' />
							{totalItems > 0 && (
								<span className='absolute -top-2 -right-2 bg-mystic-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
									{totalItems}
								</span>
							)}
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
