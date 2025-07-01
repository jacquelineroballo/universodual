export interface Product {
	id: string // Changed from number to string to match Supabase UUID
	name: string
	price: number
	image: string
	description: string
	category: 'velas' | 'inciensos' | 'cristales' | 'accesorios'
	inStock: boolean
}

export interface CartItem extends Product {
	quantity: number
}
