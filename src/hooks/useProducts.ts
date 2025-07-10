import { useState, useEffect } from 'react'
import { mockApi, MockProduct } from '../services/mockApi'
import { Product } from '../types/Product'

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchProducts()
	}, [])

	const fetchProducts = async () => {
		try {
			setLoading(true)
			setError(null)
			const mockProducts = await mockApi.getProducts()

			// Transform MockProduct to Product interface
			const transformedProducts: Product[] = mockProducts.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				image: item.image,
				description: item.description,
				category: item.category as 'velas' | 'inciensos' | 'cristales' | 'accesorios',
				inStock: item.stock > 0,
				stock: item.stock,
				featured: item.featured || false,
			}))

			setProducts(transformedProducts)
		} catch (err) {
			console.error('Error in fetchProducts:', err)
			setError('Error al cargar los productos')
		} finally {
			setLoading(false)
		}
	}

	const getProductById = (id: string) => {
		return products.find((product) => product.id === id)
	}

	const getProductsByCategory = (category: string) => {
		return products.filter((product) => product.category === category)
	}

	const getFeaturedProducts = () => {
		return products.filter((product) => product.featured)
	}

	return {
		products,
		loading,
		error,
		getProductById,
		getProductsByCategory,
		getFeaturedProducts,
		refetch: fetchProducts,
	}
}
