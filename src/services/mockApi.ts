const MOCK_API_URL = 'https://6866c01a89803950dbb3c66e.mockapi.io/universodual'

export interface MockProduct {
	id: string
	name: string
	description: string
	price: number
	image: string
	category: string
	stock: number
	featured: boolean
}

export const mockApi = {
	// Obtener todos los productos
	async getProducts(): Promise<MockProduct[]> {
		console.log('Fetching products from:', `${MOCK_API_URL}/products`)

		try {
			const response = await fetch(`${MOCK_API_URL}/products`)

			if (!response.ok) {
				console.error('API request failed:', response.status, response.statusText)
				throw new Error(`Error al obtener productos: ${response.status}`)
			}

			const data = await response.json()
			console.log('Products fetched successfully:', data)
			return data
		} catch (error) {
			console.error('Error in getProducts:', error)
			throw error
		}
	},

	// Crear un nuevo producto
	async createProduct(product: Omit<MockProduct, 'id'>): Promise<MockProduct> {
		console.log('Creating product:', product)

		try {
			const response = await fetch(`${MOCK_API_URL}/products`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			})

			if (!response.ok) {
				const errorText = await response.text()
				console.error('Create product failed:', response.status, errorText)
				throw new Error(`Error al crear producto: ${response.status}`)
			}

			const data = await response.json()
			console.log('Product created successfully:', data)
			return data
		} catch (error) {
			console.error('Error in createProduct:', error)
			throw error
		}
	},

	// Actualizar un producto
	async updateProduct(id: string, product: Partial<MockProduct>): Promise<MockProduct> {
		console.log('Updating product:', id, product)

		try {
			const response = await fetch(`${MOCK_API_URL}/products/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			})

			if (!response.ok) {
				const errorText = await response.text()
				console.error('Update product failed:', response.status, errorText)
				throw new Error(`Error al actualizar producto: ${response.status}`)
			}

			const data = await response.json()
			console.log('Product updated successfully:', data)
			return data
		} catch (error) {
			console.error('Error in updateProduct:', error)
			throw error
		}
	},

	// Eliminar un producto
	async deleteProduct(id: string): Promise<void> {
		console.log('Deleting product:', id)

		try {
			const response = await fetch(`${MOCK_API_URL}/products/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				const errorText = await response.text()
				console.error('Delete product failed:', response.status, errorText)
				throw new Error(`Error al eliminar producto: ${response.status}`)
			}

			console.log('Product deleted successfully')
		} catch (error) {
			console.error('Error in deleteProduct:', error)
			throw error
		}
	},
}
