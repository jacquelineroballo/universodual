import React from 'react'
import Header from '../components/Header'
import { useCart } from '@/hooks/useCart'

const OurHistoryPage: React.FC = () => {
	const { cartItems } = useCart()

	return (
		<div className='min-h-screen bg-white'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-12'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center'>
						Nuestra Historia
					</h1>

					<div className='prose prose-lg mx-auto'>
						<div className='bg-gradient-to-br from-mystic-lavender/20 via-mystic-cream to-mystic-rose/20 p-8 rounded-lg shadow-lg mb-12'>
							<p className='font-montserrat text-gray-700 mb-6 leading-relaxed'>
								En el corazón de nuestra ciudad, Universo Dual nació de un sueño compartido: crear
								un espacio donde la magia y la artesanía se encuentran. Fundado en 2020, durante un
								período de reflexión global, nos propusimos traer luz y equilibrio a la vida de las
								personas.
							</p>

							<p className='font-montserrat text-gray-700 mb-6 leading-relaxed'>
								Nuestro viaje comenzó con una simple vela artesanal, creada con intención y amor.
								Desde entonces, hemos expandido nuestra colección para incluir una cuidadosa
								selección de cristales energéticos, inciensos sagrados y herramientas místicas, cada
								uno elegido o creado con el propósito de elevar el espíritu y transformar espacios.
							</p>
						</div>

						<div className='grid md:grid-cols-2 gap-8 mb-12'>
							<div className='bg-mystic-cream p-6 rounded-lg shadow-md'>
								<h2 className='font-playfair text-2xl font-bold text-mystic-gold mb-4'>
									Nuestra Misión
								</h2>
								<p className='font-montserrat text-gray-700'>
									Buscamos proporcionar herramientas y productos artesanales de la más alta calidad
									para aquellos que buscan elevar su práctica espiritual y crear espacios sagrados
									en sus hogares.
								</p>
							</div>

							<div className='bg-mystic-cream p-6 rounded-lg shadow-md'>
								<h2 className='font-playfair text-2xl font-bold text-mystic-gold mb-4'>
									Nuestros Valores
								</h2>
								<ul className='font-montserrat text-gray-700 list-disc list-inside space-y-2'>
									<li>Artesanía consciente y sostenible</li>
									<li>Respeto por las tradiciones ancestrales</li>
									<li>Compromiso con la calidad</li>
									<li>Servicio auténtico y personalizado</li>
								</ul>
							</div>
						</div>

						<div className='text-center'>
							<p className='font-montserrat text-gray-700 italic'>
								"En cada producto que creamos, vertemos nuestra intención de traer luz, equilibrio y
								transformación a la vida de nuestros clientes."
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default OurHistoryPage
