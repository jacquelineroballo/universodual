import { useState, useEffect } from 'react'
import { Product } from '../types/Product'

interface UseProductsReturn {
	products: Product[]
	loading: boolean
	error: string | null
	refetch: () => void
}

// Simulamos una API con datos mock
const mockApiCall = (): Promise<Product[]> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulamos un 10% de probabilidad de error para demostrar el manejo de errores
			if (Math.random() < 0.1) {
				reject(new Error('Error al cargar los productos. Intenta nuevamente.'))
				return
			}

			const mockProducts: Product[] = [
				{
					id: 1,
					name: 'Vela de Lavanda',
					price: 1200,
					image:
						'https://images.unsplash.com/photo-1625055887171-4a3186a42b39?w=300&h=300&fit=crop&crop=center',
					description:
						'Vela artesanal de lavanda para la relajación y paz interior. Elaborada con cera de soja natural.',
					category: 'velas',
					inStock: true,
				},
				{
					id: 2,
					name: 'Incienso de Sándalo Sagrado',
					price: 8.5,
					image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
					description: 'Incienso premium de sándalo para meditación y purificación energética.',
					category: 'inciensos',
					inStock: true,
				},
				{
					id: 3,
					name: 'Cristal de Amatista',
					price: 25.0,
					image:
						'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
					description: 'Amatista natural para la protección espiritual y claridad mental.',
					category: 'cristales',
					inStock: true,
				},
				{
					id: 4,
					name: 'Vela de Rosa Mística',
					price: 18.75,
					image:
						'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
					description: 'Vela aromática de rosa para el amor y la armonía del hogar.',
					category: 'velas',
					inStock: false,
				},
				{
					id: 5,
					name: 'Set de Inciensos Chakras',
					price: 32.0,
					image:
						'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
					description: 'Colección de 7 inciensos para equilibrar todos los chakras.',
					category: 'inciensos',
					inStock: true,
				},
				{
					id: 6,
					name: 'Cuarzo Rosa del Amor',
					price: 12.99,
					image:
						'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
					description: 'Cuarzo rosa natural para atraer el amor y la compasión.',
					category: 'cristales',
					inStock: true,
				},
				{
					id: 7,
					name: 'Vela Ritual Luna Llena',
					price: 22.5,
					image:
						'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
					description: 'Vela especial para rituales de luna llena, con esencias lunares.',
					category: 'velas',
					inStock: true,
				},
				{
					id: 8,
					name: 'Péndulo de Obsidiana',
					price: 16.0,
					image:
						'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
					description: 'Péndulo de obsidiana para adivinación y búsqueda de respuestas.',
					category: 'accesorios',
					inStock: true,
				},
			]

			resolve(mockProducts)
		}, Math.random() * 2000 + 500) // Simulamos entre 0.5 y 2.5 segundos de carga
	})
}

export const useProducts = (): UseProductsReturn => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const fetchProducts = async () => {
		try {
			setLoading(true)
			setError(null)
			console.log('Cargando productos desde la API...')

			const data = await mockApiCall()
			setProducts(data)
			console.log('Productos cargados exitosamente:', data.length)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
			setError(errorMessage)
			console.error('Error al cargar productos:', errorMessage)
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
