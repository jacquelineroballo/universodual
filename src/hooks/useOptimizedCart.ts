import { useMemo, useCallback } from 'react'
import { useGlobalState } from '../contexts/GlobalStateContext'
import { Product } from '../types/Product'

export const useOptimizedCart = () => {
	const { state, actions } = useGlobalState()

	const cartItems = state.cart.items
	const isCartOpen = state.cart.isOpen
	const totalPrice = state.cart.totalPrice
	const totalItems = state.cart.totalItems

	const addToCart = useCallback(
		(product: Product) => {
			actions.addToCart(product)
		},
		[actions]
	)

	const removeFromCart = useCallback(
		(productId: string) => {
			actions.removeFromCart(productId)
		},
		[actions]
	)

	const updateQuantity = useCallback(
		(productId: string, quantity: number) => {
			actions.updateCartQuantity(productId, quantity)
		},
		[actions]
	)

	const clearCart = useCallback(() => {
		actions.clearCart()
	}, [actions])

	const toggleCart = useCallback(() => {
		actions.toggleCart()
	}, [actions])

	const setCartOpen = useCallback(
		(isOpen: boolean) => {
			actions.setCartOpen(isOpen)
		},
		[actions]
	)

	const getItemQuantity = useCallback(
		(productId: string) => {
			const item = cartItems.find((item) => item.id === productId)
			return item ? item.quantity : 0
		},
		[cartItems]
	)

	const cartSummary = useMemo(
		() => ({
			itemCount: totalItems,
			totalPrice,
			isEmpty: cartItems.length === 0,
			hasItems: cartItems.length > 0,
		}),
		[totalItems, totalPrice, cartItems.length]
	)

	return {
		cartItems,
		isCartOpen,
		totalPrice,
		totalItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		toggleCart,
		setCartOpen,
		getItemQuantity,
		cartSummary,
	}
}
