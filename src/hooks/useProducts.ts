import { useState, useEffect } from 'react'
import supabase from '@/integrations/supabase/client'
import { Product } from '../types/Product'

interface UseProductsReturn {
	products: Product[]
	loading: boolean
	error: string | null
	refetch: () => void
}

export const useProducts = (): UseProductsReturn => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const fetchProducts = async () => {
		try {
			setLoading(true)
			setError(null)
			console.log('Cargando productos desde Supabase...')

			const { data, error: supabaseError } = await supabase
				.from('products')
				.select('*')
				.order('created_at', { ascending: false })

			if (supabaseError) {
				throw supabaseError
			}

			// Transform the data to match our Product interface
			const transformedProducts: Product[] = (data || []).map((item) => ({
				id: item.id, // Keep as string (UUID)
				name: item.name,
				price: parseFloat(item.price) || 0,
				image: item.image,
				description: item.description,
				category: item.category as 'velas' | 'inciensos' | 'cristales' | 'accesorios', // Type assertion
				inStock: item.stock > 0,
			}))

			setProducts(transformedProducts)
			console.log('Productos cargados exitosamente desde Supabase:', transformedProducts.length)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
			setError(errorMessage)
			console.error('Error al cargar productos desde Supabase:', errorMessage)

			// Fallback to mock data if Supabase fails
			const mockProducts: Product[] = [
				{
					id: '1',
					name: 'Vela de Lavanda Celestial',
					price: 15.99,
					image:
						'https://images.unsplash.com/photo-1602874801006-dfbb91de7717?w=400&h=400&fit=crop',
					description:
						'Vela artesanal de lavanda para la relajación y paz interior. Elaborada con cera de soja natural.',
					category: 'velas',
					inStock: true,
				},
				{
					id: '2',
					name: 'Incienso de Sándalo Sagrado',
					price: 8.5,
					image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
					description: 'Incienso premium de sándalo para meditación y purificación energética.',
					category: 'inciensos',
					inStock: true,
				},
				{
					id: '3',
					name: 'Cristal de Amatista',
					price: 25.0,
					image:
						'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
					description: 'Amatista natural para la protección espiritual y claridad mental.',
					category: 'cristales',
					inStock: true,
				},
			]
			setProducts(mockProducts)
			console.log('Usando productos mock como fallback')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	const refetch = () => {
		fetchProducts()
	}

	return {
		products,
		loading,
		error,
		refetch,
	}
}
