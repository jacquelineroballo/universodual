import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { mockApi, MockProduct } from '../services/mockApi'
import { useToast } from '../hooks/use-toast'

interface ProductsContextType {
	products: MockProduct[]
	loading: boolean
	error: string | null
	fetchProducts: () => Promise<void>
	createProduct: (product: Omit<MockProduct, 'id'>) => Promise<void>
	updateProduct: (id: string, product: Partial<MockProduct>) => Promise<void>
	deleteProduct: (id: string) => Promise<void>
	clearError: () => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const useProducts = () => {
	const context = useContext(ProductsContext)
	if (!context) {
		throw new Error('useProducts must be used within a ProductsProvider')
	}
	return context
}

interface ProductsProviderProps {
	children: ReactNode
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
	const [products, setProducts] = useState<MockProduct[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { toast } = useToast()

	const clearError = useCallback(() => {
		setError(null)
	}, [])

	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			const fetchedProducts = await mockApi.getProducts()
			setProducts(fetchedProducts)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
			setError(errorMessage)
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}, [toast])

	const createProduct = useCallback(
		async (productData: Omit<MockProduct, 'id'>) => {
			try {
				setLoading(true)
				setError(null)
				const newProduct = await mockApi.createProduct(productData)
				setProducts((prev) => [...prev, newProduct])
				toast({
					title: '¡Éxito!',
					description: 'Producto creado correctamente',
				})
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error al crear producto'
				setError(errorMessage)
				toast({
					title: 'Error',
					description: errorMessage,
					variant: 'destructive',
				})
				throw err
			} finally {
				setLoading(false)
			}
		},
		[toast]
	)

	const updateProduct = useCallback(
		async (id: string, productData: Partial<MockProduct>) => {
			try {
				setLoading(true)
				setError(null)

				// Prepare the complete product data for the API
				const currentProduct = products.find((p) => p.id === id)
				if (!currentProduct) {
					throw new Error('Producto no encontrado')
				}

				const completeProductData = {
					...currentProduct,
					...productData,
				}

				const updatedProduct = await mockApi.updateProduct(id, completeProductData)
				setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
				toast({
					title: '¡Éxito!',
					description: 'Producto actualizado correctamente',
				})
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto'
				setError(errorMessage)
				toast({
					title: 'Error',
					description: errorMessage,
					variant: 'destructive',
				})
				throw err
			} finally {
				setLoading(false)
			}
		},
		[toast, products]
	)

	const deleteProduct = useCallback(
		async (id: string) => {
			try {
				setLoading(true)
				setError(null)
				await mockApi.deleteProduct(id)
				setProducts((prev) => prev.filter((p) => p.id !== id))
				toast({
					title: '¡Éxito!',
					description: 'Producto eliminado correctamente',
				})
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto'
				setError(errorMessage)
				toast({
					title: 'Error',
					description: errorMessage,
					variant: 'destructive',
				})
				throw err
			} finally {
				setLoading(false)
			}
		},
		[toast]
	)

	const value: ProductsContextType = {
		products,
		loading,
		error,
		fetchProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		clearError,
	}

	return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
