import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Settings, Star } from 'lucide-react'
import { CartItem } from '../types/Product'
import { Button } from './ui/button'
import AuthButton from './AuthButton'
import { useAuth } from '../hooks/useAuth'

interface HeaderProps {
	cartItems: CartItem[]
	onCartClick: () => void
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick }) => {
	const navigate = useNavigate()
	const { user, isAdmin } = useAuth()
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<header className='bg-white shadow-lg sticky top-0 z-50'>
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
							to='/productos'
							className='font-montserrat text-gray-600 hover:text-mystic-gold transition-colors'
						>
							Catálogo
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
						{user && isAdmin && (
							<Button
								onClick={() => navigate('/admin')}
								variant='outline'
								size='sm'
								className='font-montserrat bg-gradient-to-r from-mystic-gold/20 to-mystic-rose/20 hover:from-mystic-gold/40 hover:to-mystic-rose/40 text-gray-800 border border-mystic-gold/30 text-base rounded-xl'
							>
								<Settings className='w-4 h-4 mr-2' />
								Admin
							</Button>
						)}

						<AuthButton />

						<Button
							onClick={onCartClick}
							className='text-gray-800 relative rounded-xl bg-[#c8b8db]/[0.72]'
							size='sm'
						>
							<ShoppingCart className='w-5 h-5' />
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
