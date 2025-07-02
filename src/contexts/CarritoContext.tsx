import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '../types/Product'

interface CarritoContextType {
	cartItems: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	getTotalPrice: () => number
	getTotalItems: () => number
	getItemQuantity: (productId: string) => number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

interface CarritoProviderProps {
	children: ReactNode
}

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	// Load cart from localStorage on mount
	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			setCartItems(JSON.parse(savedCart))
		}
	}, [])

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems))
	}, [cartItems])

	const addToCart = (product: Product) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === product.id)

			if (existingItem) {
				return prevItems.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				)
			} else {
				return [...prevItems, { ...product, quantity: 1 }]
			}
		})
	}

	const removeFromCart = (productId: string) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
	}

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId)
			return
		}

		setCartItems((prevItems) =>
			prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
		)
	}

	const clearCart = () => {
		setCartItems([])
	}

	const getTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
	}

	const getTotalItems = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0)
	}

	const getItemQuantity = (productId: string) => {
		const item = cartItems.find((item) => item.id === productId)
		return item ? item.quantity : 0
	}

	const value = {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		getTotalPrice,
		getTotalItems,
		getItemQuantity,
	}

	return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

export const useCarrito = () => {
	const context = useContext(CarritoContext)
	if (context === undefined) {
		throw new Error('useCarrito must be used within a CarritoProvider')
	}
	return context
}
