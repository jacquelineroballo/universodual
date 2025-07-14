import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { useToast } from '../hooks/use-toast'
import { Send, ArrowLeft, Mail, User, MessageSquare } from 'lucide-react'
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
		<div className='min-h-screen bg-gradient-to-br from-mystic-cream via-mystic-lavender/10 to-mystic-beige/20 font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/')}
							className='p-2 hover:bg-white rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<div>
							<h1 className='font-playfair text-3xl font-bold text-gray-800'>Contacto</h1>
							<p className='text-gray-600 mt-2'>
								Nos encantaría escucharte. Envíanos un mensaje y te responderemos pronto.
							</p>
						</div>
					</div>

					{/* Contact Form */}
					<div className='bg-white rounded-lg shadow-lg p-8'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
									<User className='w-4 h-4 inline mr-2' />
									Nombre completo
								</label>
								<Input
									id='name'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className='w-full'
									placeholder='Tu nombre completo'
								/>
							</div>

							<div>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
									<Mail className='w-4 h-4 inline mr-2' />
									Email
								</label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className='w-full'
									placeholder='tu@email.com'
								/>
							</div>

							<div>
								<label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
									<MessageSquare className='w-4 h-4 inline mr-2' />
									Mensaje
								</label>
								<Textarea
									id='message'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									required
									className='w-full min-h-[120px]'
									placeholder='Escribe tu mensaje aquí...'
								/>
							</div>

							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-semibold py-3'
							>
								{loading ? (
									'Enviando...'
								) : (
									<>
										<Send className='w-4 h-4 mr-2' />
										Enviar Mensaje
									</>
								)}
							</Button>
						</form>
					</div>

					{/* Contact Info */}
					<div className='mt-8 text-center'>
						<div className='bg-white rounded-lg shadow-lg p-6'>
							<h2 className='font-playfair text-xl font-bold text-gray-800 mb-4'>
								Otras formas de contacto
							</h2>
							<div className='space-y-2 text-gray-600'>
								<p>📧 info@universodual.com</p>
								<p>🕐 Horario de atención: Lunes a Viernes 9:00 - 18:00</p>
								<p>💫 Te responderemos en menos de 24 horas</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default ContactPage
