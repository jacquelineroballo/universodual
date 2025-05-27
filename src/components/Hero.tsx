import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Hero: React.FC = () => {
	const navigate = useNavigate()
	return (
		<section className='relative bg-gradient-to-br from-mystic-rose via-mystic-cream to-mystic-lavender min-h-[100vh] flex items-center'>
			{/* Elementos decorativos flotantes */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute top-20 left-10 w-4 h-4 bg-mystic-gold rounded-full animate-float opacity-60'></div>
				<div
					className='absolute top-40 right-20 w-3 h-3 bg-mystic-beige rounded-full animate-float'
					style={{ animationDelay: '1s' }}
				></div>
				<div
					className='absolute bottom-32 left-1/4 w-2 h-2 bg-mystic-gold rounded-full animate-float'
					style={{ animationDelay: '2s' }}
				></div>
				<div
					className='absolute top-1/3 right-1/3 w-5 h-5 bg-mystic-rose rounded-full animate-float opacity-40'
					style={{ animationDelay: '0.5s' }}
				></div>
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='max-w-3xl mx-auto text-center'>
					<h1 className='font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight'>
						Bienvenido al
						<span className='text-mystic-gold block'>UNIVERSO DUAL</span>
					</h1>

					<p className='font-montserrat text-xl text-gray-700 mb-3 leading-relaxed'>
						Descubre la magia en cada producto artesanal.
					</p>
					<p className='font-montserrat  text-gray-700 mb-8'>
						Velas aromáticas, inciensos y sahumos artesanales, cristales energéticos para elevar tu
						energía y transformar tu espacio.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-semibold px-8 py-3 text-lg'
							onClick={() =>
								document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
							}
						>
							Explorar Productos
						</Button>

						<Button
							variant='outline'
							className='border-mystic-gold text-mystic-gold hover:bg-mystic-gold hover:text-gray-800 font-montserrat font-semibold px-8 py-3 text-lg'
							onClick={() => navigate('/nuestra-historia')}
						>
							Nuestra Historia
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
