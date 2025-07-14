import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { useToast } from '../hooks/use-toast'
import { Send, Mail, Phone, Clock, MapPin } from 'lucide-react'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'
const ContactPage: React.FC = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { toast } = useToast()
	const { cartItems } = useCarrito()
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			// Obtener mensajes existentes de localStorage
			const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]')

			// Crear nuevo mensaje
			const newMessage = {
				id: Date.now().toString(),
				name,
				email,
				message,
				status: 'new',
				created_at: new Date().toISOString(),
			}

			// Agregar el nuevo mensaje
			existingMessages.push(newMessage)

			// Guardar en localStorage
			localStorage.setItem('contact_messages', JSON.stringify(existingMessages))
			toast({
				title: '¡Mensaje enviado!',
				description: 'Gracias por contactarnos. Te responderemos pronto.',
			})

			// Limpiar formulario
			setName('')
			setEmail('')
			setMessage('')
		} catch (error) {
			console.error('Error sending message:', error)
			toast({
				title: 'Error',
				description: 'No se pudo enviar el mensaje. Intenta nuevamente.',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-lavender via-mystic-cream to-mystic-beige font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			{/* Hero Section */}
			<div className='py-16 bg-gradient-to-br from-mystic-rose from-mystic-cream bg-transparent'>
				<div className='container mx-auto px-4 text-center'>
					<h1 className='font-playfair text-5xl font-bold text-gray-800 mb-4'>Contacto</h1>
					<p className='text-xl text-gray-700 max-w-2xl mx-auto'>
						Estamos acá para acompañarte en tu viaje espiritual. Contactanos y descubrí el poder de
						lo místico.
					</p>
				</div>
			</div>

			<main className='container mx-auto px-4 py-16 bg-white'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto'>
					{/* Contact Information */}
					<div className='space-y-8'>
						<div>
							<h2 className='font-playfair text-3xl font-bold text-gray-800 mb-6'>
								Información de Contacto
							</h2>
							<p className='text-gray-600 text-lg mb-8'>
								¿Tenés alguna pregunta sobre nuestros productos? Estamos acá para ayudarte.
							</p>
						</div>

						<div className='space-y-6'>
							<div className='flex items-center gap-4 p-4 bg-mystic-lavender/30 rounded-2xl'>
								<div className='w-12 h-12 bg-mystic-lavender rounded-full flex items-center justify-center'>
									<Mail className='w-6 h-6 text-gray-700' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-800'>Email</h3>
									<p className='text-gray-600'>info@universodual.com</p>
								</div>
							</div>

							<div className='flex items-center gap-4 p-4 bg-mystic-lavender/30 rounded-2xl'>
								<div className='w-12 h-12 bg-mystic-lavender rounded-full flex items-center justify-center'>
									<Phone className='w-6 h-6 text-gray-700' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-800'>WhatsApp</h3>
									<p className='text-gray-600'>+54 9 11 1234-5678</p>
								</div>
							</div>

							<div className='flex items-center gap-4 p-4 bg-mystic-lavender/30 rounded-2xl'>
								<div className='w-12 h-12 bg-mystic-lavender rounded-full flex items-center justify-center'>
									<Clock className='w-6 h-6 text-gray-700' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-800'>Horarios</h3>
									<p className='text-gray-600'>Lunes a Viernes 9:00 - 18:00</p>
								</div>
							</div>

							<div className='flex items-center gap-4 p-4 bg-mystic-lavender/30 rounded-2xl'>
								<div className='w-12 h-12 bg-mystic-lavender rounded-full flex items-center justify-center'>
									<MapPin className='w-6 h-6 text-gray-700' />
								</div>
								<div>
									<h3 className='font-semibold text-gray-800'>Ubicación</h3>
									<p className='text-gray-600'>Buenos Aires, Argentina</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className='bg-mystic-rose/30 p-8 rounded-2xl'>
						<h2 className='font-playfair text-3xl font-bold text-gray-800 mb-4 text-center'>
							Envianos un Mensaje
						</h2>
						<p className='text-gray-600 text-center mb-8'>
							Completá el formulario y te responderemos pronto
						</p>

						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
									Nombre completo
								</label>
								<Input
									id='name'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									placeholder='Tu nombre completo'
									className='w-full bg-white rounded-sm'
								/>
							</div>

							<div>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
									Email
								</label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className='w-full bg-white'
									placeholder='tu@email.com'
								/>
							</div>

							<div>
								<label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
									Mensaje
								</label>
								<Textarea
									id='message'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									required
									className='w-full min-h-[120px] bg-white'
									placeholder='Cuéntanos en qué podemos ayudarte...'
								/>
							</div>

							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-mystic-rose hover:bg-mystic-rose/80 text-gray-800 font-semibold py-3 text-lg rounded-xl'
							>
								{loading ? (
									'Enviando...'
								) : (
									<>
										<Send className='w-5 h-5 mr-2' />
										Enviar Mensaje
									</>
								)}
							</Button>
						</form>
					</div>
				</div>
			</main>
			{/* Footer */}
			<footer className='bg-mystic-rose/30 py-5'>
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
export default ContactPage
