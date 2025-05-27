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
						'https://images.unsplash.com/photo-1643734311357-f47a03dab6d2?w=300&h=400&fit=crop&crop=center',
					description:
						'Vela artesanal de lavanda para la relajación y paz interior. Elaborada con cera de soja natural. Duración aproximada de 40 horas.',
					category: 'velas',
					inStock: true,
				},
				{
					id: 2,
					name: 'Incienso de Sándalo',
					price: 500,
					image:
						'https://images.unsplash.com/photo-1733749843924-7a5420d54e39?w=400&h=400&fit=crop',
					description:
						'Incienso de sándalo para purificación energética, meditación y relajación profunda.',
					category: 'inciensos',
					inStock: true,
				},
				{
					id: 3,
					name: 'Vela de Rosas',
					price: 7000,
					image:
						'https://images.unsplash.com/photo-1643734561997-0ff22fd0bcb9?w=400&h=400&fit=crop',
					description:
						'Vela aromática con aceites de rosa damascena y cuarzo rosa. Ideal para atraer el amor y la armonía.',
					category: 'velas',
					inStock: false,
				},
				{
					id: 4,
					name: 'Cristal de Amatista',
					price: 7000,
					image:
						'https://images.unsplash.com/photo-1717313303951-515678b73c8d?w=400&h=400&fit=crop',
					description: 'Amatista natural para la protección espiritual y claridad mental.',
					category: 'cristales',
					inStock: true,
				},

				{
					id: 5,
					name: 'Cristal Cuarzo rosa',
					price: 3200,
					image:
						'https://images.unsplash.com/photo-1586658066544-a87cdd681398?w=400&h=400&fit=crop',
					description:
						'Cuarzo rosa natural de Brasil. Piedra del amor incondicional y la sanación emocional. Tamaño mediano.',
					category: 'inciensos',
					inStock: true,
				},
				{
					id: 6,
					name: 'Vela Protección',
					price: 7000,
					image:
						'https://images.unsplash.com/photo-1643734246311-054654319bac?w=400&h=400&fit=crop',
					description:
						'Vela con romero y ruda para protección energética. Duración aproximada de 8 horas.',
					category: 'velas',
					inStock: true,
				},
				{
					id: 7,
					name: 'Incienso Palo Santo',
					price: 500,
					image:
						'https://images.unsplash.com/photo-1620003245338-3b12cbd59084?w=400&h=400&fit=crop',
					description:
						'Palo santo auténtico del Perú. Limpia espacios y eleva la vibración energética. Pack de 6 palos.',
					category: 'inciensos',
					inStock: true,
				},
				{
					id: 8,
					name: 'Vela Sanación Espiritual',
					price: 7000,
					image:
						'https://images.unsplash.com/photo-1643734423874-088e2090ff4b?w=400&h=400&fit=crop',
					description:
						'Vela especial con salvia y laurel para rituales de sanación y purificación energética y espiritual.',
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
