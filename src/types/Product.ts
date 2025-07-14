export interface Product {
	id: string
	name: string
	price: number
	image: string
	description: string
	category: string
	stock: number
	featured: boolean
}

export interface CartItem extends Product {
	quantity: number
}
