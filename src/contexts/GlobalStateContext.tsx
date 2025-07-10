import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, Product } from '../types/Product'

interface GlobalState {
	cart: {
		items: CartItem[]
		isOpen: boolean
		totalPrice: number
		totalItems: number
	}
	user: {
		isAuthenticated: boolean
		role: 'admin' | 'user' | null
	}
	ui: {
		loading: boolean
		error: string | null
		notifications: Array<{
			id: string
			type: 'success' | 'error' | 'info'
			message: string
		}>
	}
}

type GlobalAction =
	| { type: 'ADD_TO_CART'; payload: Product }
	| { type: 'REMOVE_FROM_CART'; payload: string }
	| { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
	| { type: 'CLEAR_CART' }
	| { type: 'TOGGLE_CART' }
	| { type: 'SET_CART_OPEN'; payload: boolean }
	| { type: 'SET_USER'; payload: { isAuthenticated: boolean; role: 'admin' | 'user' | null } }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERROR'; payload: string | null }
	| { type: 'ADD_NOTIFICATION'; payload: { type: 'success' | 'error' | 'info'; message: string } }
	| { type: 'REMOVE_NOTIFICATION'; payload: string }

const initialState: GlobalState = {
	cart: {
		items: [],
		isOpen: false,
		totalPrice: 0,
		totalItems: 0,
	},
	user: {
		isAuthenticated: false,
		role: null,
	},
	ui: {
		loading: false,
		error: null,
		notifications: [],
	},
}

const calculateCartTotals = (items: CartItem[]) => {
	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
	const totalItems = items.reduce((total, item) => total + item.quantity, 0)
	return { totalPrice, totalItems }
}

const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			const existingItemIndex = state.cart.items.findIndex((item) => item.id === action.payload.id)
			let newItems: CartItem[]

			if (existingItemIndex >= 0) {
				newItems = state.cart.items.map((item, index) =>
					index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
				)
			} else {
				newItems = [...state.cart.items, { ...action.payload, quantity: 1 }]
			}

			const { totalPrice, totalItems } = calculateCartTotals(newItems)
			return {
				...state,
				cart: {
					...state.cart,
					items: newItems,
					totalPrice,
					totalItems,
				},
			}
		}

		case 'REMOVE_FROM_CART': {
			const newItems = state.cart.items.filter((item) => item.id !== action.payload)
			const { totalPrice, totalItems } = calculateCartTotals(newItems)
			return {
				...state,
				cart: {
					...state.cart,
					items: newItems,
					totalPrice,
					totalItems,
				},
			}
		}

		case 'UPDATE_CART_QUANTITY': {
			if (action.payload.quantity <= 0) {
				return globalReducer(state, { type: 'REMOVE_FROM_CART', payload: action.payload.id })
			}

			const newItems = state.cart.items.map((item) =>
				item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
			)
			const { totalPrice, totalItems } = calculateCartTotals(newItems)
			return {
				...state,
				cart: {
					...state.cart,
					items: newItems,
					totalPrice,
					totalItems,
				},
			}
		}

		case 'CLEAR_CART':
			return {
				...state,
				cart: {
					items: [],
					isOpen: false,
					totalPrice: 0,
					totalItems: 0,
				},
			}

		case 'TOGGLE_CART':
			return {
				...state,
				cart: {
					...state.cart,
					isOpen: !state.cart.isOpen,
				},
			}

		case 'SET_CART_OPEN':
			return {
				...state,
				cart: {
					...state.cart,
					isOpen: action.payload,
				},
			}

		case 'SET_USER':
			return {
				...state,
				user: action.payload,
			}

		case 'SET_LOADING':
			return {
				...state,
				ui: {
					...state.ui,
					loading: action.payload,
				},
			}

		case 'SET_ERROR':
			return {
				...state,
				ui: {
					...state.ui,
					error: action.payload,
				},
			}

		case 'ADD_NOTIFICATION': {
			const id = Date.now().toString()
			return {
				...state,
				ui: {
					...state.ui,
					notifications: [...state.ui.notifications, { id, ...action.payload }],
				},
			}
		}

		case 'REMOVE_NOTIFICATION':
			return {
				...state,
				ui: {
					...state.ui,
					notifications: state.ui.notifications.filter((n) => n.id !== action.payload),
				},
			}

		default:
			return state
	}
}

interface GlobalStateContextType {
	state: GlobalState
	dispatch: React.Dispatch<GlobalAction>
	actions: {
		addToCart: (product: Product) => void
		removeFromCart: (productId: string) => void
		updateCartQuantity: (productId: string, quantity: number) => void
		clearCart: () => void
		toggleCart: () => void
		setCartOpen: (isOpen: boolean) => void
		setUser: (user: { isAuthenticated: boolean; role: 'admin' | 'user' | null }) => void
		setLoading: (loading: boolean) => void
		setError: (error: string | null) => void
		addNotification: (type: 'success' | 'error' | 'info', message: string) => void
		removeNotification: (id: string) => void
	}
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined)

interface GlobalStateProviderProps {
	children: ReactNode
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, initialState)

	// Persist cart to localStorage
	React.useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			try {
				const parsedCart = JSON.parse(savedCart)
				parsedCart.forEach((item: CartItem) => {
					dispatch({ type: 'ADD_TO_CART', payload: item })
				})
			} catch (error) {
				console.error('Error loading cart from localStorage:', error)
			}
		}
	}, [])

	React.useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart.items))
	}, [state.cart.items])

	const actions = React.useMemo(
		() => ({
			addToCart: (product: Product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
			removeFromCart: (productId: string) =>
				dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
			updateCartQuantity: (productId: string, quantity: number) =>
				dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } }),
			clearCart: () => dispatch({ type: 'CLEAR_CART' }),
			toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
			setCartOpen: (isOpen: boolean) => dispatch({ type: 'SET_CART_OPEN', payload: isOpen }),
			setUser: (user: { isAuthenticated: boolean; role: 'admin' | 'user' | null }) =>
				dispatch({ type: 'SET_USER', payload: user }),
			setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
			setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
			addNotification: (type: 'success' | 'error' | 'info', message: string) =>
				dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } }),
			removeNotification: (id: string) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
		}),
		[]
	)

	return (
		<GlobalStateContext.Provider value={{ state, dispatch, actions }}>
			{children}
		</GlobalStateContext.Provider>
	)
}

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext)
	if (context === undefined) {
		throw new Error('useGlobalState must be used within a GlobalStateProvider')
	}
	return context
}
