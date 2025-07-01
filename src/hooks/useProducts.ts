import { useState, useEffect } from 'react'
import supabase from '@/integrations/supabase/client'
import { Product } from '../types/Product'
import { products as mockProducts } from '../data/products'

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
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.order('created_at', { ascending: false })

			if (error) {
				console.error('Error fetching products:', error)
				// Fallback to mock data
				setProducts(mockProducts)
			} else if (data && data.length > 0) {
				// Transform Supabase data to match Product interface
				const transformedProducts: Product[] = data.map((item) => ({
					id: item.id,
					name: item.name,
					price: parseFloat(item.price.toString()),
					image: item.image,
					description: item.description,
					category: item.category as 'velas' | 'inciensos' | 'cristales' | 'accesorios',
					inStock: item.stock > 0,
					stock: item.stock,
					featured: item.featured || false,
				}))
				setProducts(transformedProducts)
			} else {
				// Fallback to mock data if no products in database
				setProducts(mockProducts)
			}
		} catch (err) {
			console.error('Error in fetchProducts:', err)
			setError('Error al cargar los productos')
			// Fallback to mock data
			setProducts(mockProducts)
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
