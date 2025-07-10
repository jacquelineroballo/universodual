const MOCK_API_URL = 'https://6866c01a89803950dbb3c66f.mockapi.io/universodual'

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
		try {
			console.log('Fetching products from:', `${MOCK_API_URL}/products`)

			const response = await fetch(`${MOCK_API_URL}/products`)

			if (!response.ok) {
				console.error('API request failed:', response.status, response.statusText)
				// Si falla, devolvemos productos de ejemplo para que la vista funcione
				console.log('Returning sample products for demo')
				return [
					{
						id: '1',
						name: 'Cristal de Cuarzo',
						description: 'Cristal de cuarzo natural para meditación y equilibrio energético.',
						price: 25.99,
						image: '/placeholder.svg',
						category: 'cristales',
						stock: 10,
						featured: true,
					},
					{
						id: '2',
						name: 'Vela Aromática Lavanda',
						description: 'Vela natural con aceite esencial de lavanda para relajación.',
						price: 15.5,
						image: '/placeholder.svg',
						category: 'velas',
						stock: 20,
						featured: false,
					},
				]
			}

			const data = await response.json()
			console.log('Products fetched successfully:', data)
			return data
		} catch (error) {
			console.error('Error fetching products:', error)
			// En caso de error de red, también devolvemos productos de ejemplo
			console.log('Network error, returning sample products')
			return [
				{
					id: '1',
					name: 'Cristal de Cuarzo',
					description: 'Cristal de cuarzo natural para meditación y equilibrio energético.',
					price: 25.99,
					image: '/placeholder.svg',
					category: 'cristales',
					stock: 10,
					featured: true,
				},
				{
					id: '2',
					name: 'Vela Aromática Lavanda',
					description: 'Vela natural con aceite esencial de lavanda para relajación.',
					price: 15.5,
					image: '/placeholder.svg',
					category: 'velas',
					stock: 20,
					featured: false,
				},
			]
		}
	},

	// Crear un nuevo producto
	async createProduct(product: Omit<MockProduct, 'id'>): Promise<MockProduct> {
		try {
			console.log('Creating product:', product)

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

			const data = await response.json()
			console.log('Product created successfully:', data)
			return data
		} catch (error) {
			console.error('Error creating product:', error)
			throw new Error('No se pudo crear el producto')
		}
	},

	// Actualizar un producto
	async updateProduct(id: string, product: Partial<MockProduct>): Promise<MockProduct> {
		try {
			console.log('Updating product:', id, product)

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

			const data = await response.json()
			console.log('Product updated successfully:', data)
			return data
		} catch (error) {
			console.error('Error updating product:', error)
			throw new Error('No se pudo actualizar el producto')
		}
	},

	// Eliminar un producto
	async deleteProduct(id: string): Promise<void> {
		try {
			console.log('Deleting product:', id)

			const response = await fetch(`${MOCK_API_URL}/products/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error(`Error al eliminar producto: ${response.statusText}`)
			}
			console.log('Product deleted successfully')
		} catch (error) {
			console.error('Error deleting product:', error)
			throw new Error('No se pudo eliminar el producto')
		}
	},
}
