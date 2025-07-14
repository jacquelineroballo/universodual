import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { useToast } from '../hooks/use-toast'
import { Send, ArrowLeft } from 'lucide-react'
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
		<div className='min-h-screen bg-white font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-12'>
				<div className='max-w-md mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/')}
							className='p-2 hover:bg-gray-100 rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<h1 className='font-playfair text-2xl font-bold text-gray-800'>Contacto</h1>
					</div>

					{/* Contact Form */}
					<div className='bg-white border rounded-lg p-6'>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
									Nombre
								</label>
								<Input
									id='name'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									placeholder='Tu nombre'
								/>
							</div>

							<div>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
									Email
								</label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder='tu@email.com'
								/>
							</div>

							<div>
								<label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
									Mensaje
								</label>
								<Textarea
									id='message'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									required
									className='min-h-[100px]'
									placeholder='Tu mensaje...'
								/>
							</div>

							<Button type='submit' disabled={loading} className='w-full'>
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
				</div>
			</main>
		</div>
	)
}

export default ContactPage
