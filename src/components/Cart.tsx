import React from 'react'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { CartItem } from '../types/Product'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

interface CartProps {
	isOpen: boolean
	onClose: () => void
	items: CartItem[]
	onUpdateQuantity: (productId: string, quantity: number) => void
	onRemoveItem: (productId: string) => void
	onClearCart: () => void
	totalPrice: number
}

const Cart: React.FC<CartProps> = ({
	isOpen,
	onClose,
	items,
	onUpdateQuantity,
	onRemoveItem,
	onClearCart,
	totalPrice,
}) => {
	const navigate = useNavigate()

	const handleCheckout = () => {
		onClose() // Close the cart
		navigate('/checkout') // Navigate to checkout page
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end'>
			<div className='bg-white w-full max-w-md h-full shadow-xl flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b'>
					<h2 className='font-playfair text-xl font-bold'>Tu Carrito Mágico</h2>
					<button
						onClick={onClose}
						className='p-2 hover:bg-gray-100 rounded-full transition-colors'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Cart Items */}
				<div className='flex-1 overflow-y-auto p-6'>
					{items.length === 0 ? (
						<div className='text-center py-12'>
							<ShoppingBag className='w-16 h-16 text-gray-300 mx-auto mb-4' />
							<p className='font-montserrat text-gray-500 mb-2'>Tu carrito está vacío</p>
							<p className='font-montserrat text-sm text-gray-400'>
								Agrega algunos productos mágicos para comenzar
							</p>
						</div>
					) : (
						<div className='space-y-4'>
							{items.map((item) => (
								<div key={item.id} className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
									<img
										src={item.image}
										alt={item.name}
										className='w-16 h-16 object-cover rounded-md'
									/>

									<div className='flex-1'>
										<h3 className='font-montserrat font-medium text-sm'>{item.name}</h3>
										<p className='font-montserrat text-sm text-gray-600'>
											${item.price.toFixed(2)}
										</p>
									</div>

									<div className='flex items-center gap-2'>
										<button
											onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
											className='p-1 hover:bg-gray-200 rounded-full'
										>
											<Minus className='w-4 h-4' />
										</button>
										<span className='font-montserrat font-medium w-8 text-center'>
											{item.quantity}
										</span>
										<button
											onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
											className='p-1 hover:bg-gray-200 rounded-full'
										>
											<Plus className='w-4 h-4' />
										</button>
									</div>

									<button
										onClick={() => onRemoveItem(item.id)}
										className='p-1 hover:bg-red-100 text-red-500 rounded-full'
									>
										<X className='w-4 h-4' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{items.length > 0 && (
					<div className='border-t p-6 space-y-4'>
						<div className='flex justify-between items-center'>
							<span className='font-montserrat font-medium'>Total:</span>
							<span className='font-playfair text-xl font-bold text-mystic-gold'>
								${totalPrice.toFixed(2)}
							</span>
						</div>

						<Button
							onClick={handleCheckout}
							className='w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-semibold'
						>
							Proceder al Pago
						</Button>

						<Button onClick={onClearCart} variant='outline' className='w-full'>
							Vaciar Carrito
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
