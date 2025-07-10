import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
	useEffect,
} from 'react'
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
			console.log('ProductsContext: Fetching products...')
			const fetchedProducts = await mockApi.getProducts()
			console.log('ProductsContext: Products fetched:', fetchedProducts)
			setProducts(fetchedProducts)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
			console.error('ProductsContext: Error fetching products:', err)
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

	// Fetch products on mount
	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	const createProduct = useCallback(
		async (productData: Omit<MockProduct, 'id'>) => {
			try {
				setLoading(true)
				setError(null)
				console.log('ProductsContext: Creating product:', productData)
				const newProduct = await mockApi.createProduct(productData)
				console.log('ProductsContext: Product created:', newProduct)
				setProducts((prev) => [...prev, newProduct])
				toast({
					title: '¡Éxito!',
					description: 'Producto creado correctamente',
				})
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error al crear producto'
				console.error('ProductsContext: Error creating product:', err)
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
				console.log('ProductsContext: Updating product:', id, productData)

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
				console.log('ProductsContext: Product updated:', updatedProduct)
				setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
				toast({
					title: '¡Éxito!',
					description: 'Producto actualizado correctamente',
				})
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto'
				console.error('ProductsContext: Error updating product:', err)
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
				console.log('ProductsContext: Deleting product:', id)
				await mockApi.deleteProduct(id)
				console.log('ProductsContext: Product deleted')
				setProducts((prev) => prev.filter((p) => p.id !== id))
				toast({
					title: '¡Éxito!',
					description: 'Producto eliminado correctamente',
				})
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto'
				console.error('ProductsContext: Error deleting product:', err)
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
