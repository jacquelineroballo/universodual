const MOCK_API_URL = 'https://676f3a34b353db80c02270f9.mockapi.io/api/v1'

export interface MockProduct {
	id: string
	name: string
	price: number
	description: string
	category: 'velas' | 'inciensos' | 'cristales' | 'accesorios'
	image: string
	stock: number
	featured: boolean
}

export const mockApiService = {
	// Obtener todos los productos
	async getProducts(): Promise<MockProduct[]> {
		try {
			const response = await fetch(`${MOCK_API_URL}/products`)
			if (!response.ok) {
				throw new Error(`Error al obtener productos: ${response.statusText}`)
			}
			return await response.json()
		} catch (error) {
			console.error('Error fetching products:', error)
			throw new Error('No se pudieron cargar los productos')
		}
	},

	// Crear un nuevo producto
	async createProduct(product: Omit<MockProduct, 'id'>): Promise<MockProduct> {
		try {
			const response = await fetch(`${MOCK_API_URL}/products`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			})

			if (!response.ok) {
				throw new Error(`Error al crear producto: ${response.statusText}`)
			}

			return await response.json()
		} catch (error) {
			console.error('Error creating product:', error)
			throw new Error('No se pudo crear el producto')
		}
	},

	// Actualizar un producto
	async updateProduct(id: string, product: Partial<MockProduct>): Promise<MockProduct> {
		try {
			const response = await fetch(`${MOCK_API_URL}/products/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			})

			if (!response.ok) {
				throw new Error(`Error al actualizar producto: ${response.statusText}`)
			}

			return await response.json()
		} catch (error) {
			console.error('Error updating product:', error)
			throw new Error('No se pudo actualizar el producto')
		}
	},

	// Eliminar un producto
	async deleteProduct(id: string): Promise<void> {
		try {
			const response = await fetch(`${MOCK_API_URL}/products/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error(`Error al eliminar producto: ${response.statusText}`)
			}
		} catch (error) {
			console.error('Error deleting product:', error)
			throw new Error('No se pudo eliminar el producto')
		}
	},
}
