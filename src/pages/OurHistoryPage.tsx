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
					<h1 className='font-playfair text-4xl md:text-5xl font-bold text-gray-800 text-mystic-gold mb-8 text-center'>
						Nuestra Historia
					</h1>

					<div className='prose prose-lg mx-auto'>
						<div className='bg-gradient-to-br from-mystic-rose via-mystic-cream to-mystic-lavender opacity-80 p-8 rounded-lg shadow-lg mb-12'>
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
							<div className='bg-gradient-to-br from-mystic-lavender via-mystic-cream to-mystic-rose opacity-70 p-6 rounded-lg shadow-md'>
								<h2 className='font-playfair text-2xl font-bold text-mystic-gold mb-4'>
									Nuestra Misión
								</h2>
								<p className='font-montserrat text-gray-700'>
									Buscamos proporcionar herramientas y productos artesanales de la más alta calidad
									para aquellos que buscan elevar su práctica espiritual y crear espacios sagrados
									en sus hogares.
								</p>
							</div>

							<div className='bg-gradient-to-br  from-mystic-cream via-mystic-rose to-mystic-lavender opacity-70 p-6 rounded-lg shadow-md'>
								<h2 className='font-playfair text-2xl font-bold text-mystic-gold mb-4'>
									Nuestros Valores
								</h2>
								<ul className='font-montserrat text-gray-700 list-disc list-inside space-y-2'>
									<p>✨ Artesanía consciente y sostenible</p>
									<p>✨ Respeto por las tradiciones ancestrales</p>
									<p>✨ Compromiso con la calidad</p>
									<p>✨ Servicio auténtico y personalizado</p>
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
			{/* Footer */}
			<footer className='bg-mystic-lavender py-5'>
				<div className='container mx-auto px-4 text-center'>
					<h3 className='font-playfair text-2xl font-bold text-gray-800 mb-2'>Universo Dual ✨</h3>
					<p className='font-montserrat text-gray-600 mb-6'>
						Conectando tu alma con la magia del universo⭐
					</p>
					<div className='flex justify-center space-x-6 text-sm text-gray-500 mb-2'>
						<span> Universo Dual 2025 © Todos los derechos reservados</span>
					</div>
					<div className='flex justify-center space-x-6 text-sm text-gray-500'>
						Creado por Jacqueline <div className='animate-bounce'>💖</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default OurHistoryPage
