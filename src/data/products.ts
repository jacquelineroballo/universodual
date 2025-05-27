import { Product } from '../types/Product'

export const products: Product[] = [
	// Velas
	{
		id: 1,
		name: 'Vela Aromática de Lavanda',
		price: 25.99,
		image:
			'https://images.unsplash.com/photo-1625055887171-4a3186a42b39?w=300&h=300&fit=crop&crop=center',
		description:
			'Vela artesanal de cera de soja con aceites esenciales de lavanda. Perfecta para rituales de meditación y transmutación.',
		category: 'velas',
		inStock: true,
	},
	{
		id: 2,
		name: 'Vela Protección',
		price: 22.5,
		image:
			'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
		description:
			'Vela negra con romero y ruda para protección energética. Duración aproximada de 8 horas.',
		category: 'velas',
		inStock: true,
	},
	{
		id: 3,
		name: 'Vela Amor & Armonía',
		price: 28.0,
		image:
			'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
		description:
			'Vela rosa con aceite de rosa damascena y cuarzo rosa. Ideal para atraer el amor y la armonía.',
		category: 'velas',
		inStock: false,
	},

	// Inciensos
	{
		id: 4,
		name: 'Incienso Palo Santo',
		price: 15.99,
		image:
			'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop&crop=center',
		description:
			'Palo santo auténtico del Perú. Limpia espacios y eleva la vibración energética. Pack de 6 palos.',
		category: 'inciensos',
		inStock: true,
	},
	{
		id: 5,
		name: 'Incienso Salvia Blanca',
		price: 18.5,
		image:
			'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop&crop=center',
		description:
			'Salvia blanca californiana para purificación y limpieza energética profunda. Manojo de 15cm.',
		category: 'inciensos',
		inStock: true,
	},
	{
		id: 6,
		name: 'Incienso Copal',
		price: 12.75,
		image:
			'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop&crop=center',
		description:
			'Resina de copal mexicano para ceremonias y meditación. Aroma dulce y purificador.',
		category: 'inciensos',
		inStock: true,
	},

	// Cristales
	{
		id: 7,
		name: 'Cuarzo Rosa',
		price: 35.0,
		image:
			'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop&crop=center',
		description:
			'Cuarzo rosa natural de Brasil. Piedra del amor incondicional y la sanación emocional. Tamaño mediano.',
		category: 'cristales',
		inStock: true,
	},
	{
		id: 8,
		name: 'Amatista Cluster',
		price: 42.99,
		image:
			'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop&crop=center',
		description:
			'Cluster de amatista uruguaya. Excelente para meditación y protección espiritual. Pieza única.',
		category: 'cristales',
		inStock: true,
	},
	{
		id: 9,
		name: 'Selenita Torre',
		price: 29.99,
		image:
			'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop&crop=center',
		description: 'Torre de selenita marroquí. Purifica y carga otros cristales. Altura de 15cm.',
		category: 'cristales',
		inStock: false,
	},

	// Accesorios
	{
		id: 10,
		name: 'Portavelas Luna',
		price: 19.99,
		image:
			'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop&crop=center',
		description:
			'Portavelas de cerámica artesanal con diseño de luna creciente. Perfecto para velas pequeñas.',
		category: 'accesorios',
		inStock: true,
	},
	{
		id: 11,
		name: 'Quemador de Incienso',
		price: 24.5,
		image:
			'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop&crop=center',
		description:
			'Quemador de incienso de madera tallada a mano con símbolos místicos. Incluye bandeja recolectora.',
		category: 'accesorios',
		inStock: true,
	},
	{
		id: 12,
		name: 'Set Ritual Completo',
		price: 89.99,
		image:
			'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop&crop=center',
		description:
			'Set completo para rituales: vela, incienso, cristal, sal marina y guía de rituales. Todo lo necesario para comenzar.',
		category: 'accesorios',
		inStock: true,
	},
]
