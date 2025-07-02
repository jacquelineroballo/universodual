import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Phone, Clock, MapPin } from 'lucide-react'
import supabase from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import Header from '@/components/Header'
import { useCarrito } from '@/contexts/CarritoContext'

const contactSchema = z.object({
	name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	email: z.string().email('Ingresa un email válido'),
	message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { toast } = useToast()
	const { cartItems } = useCarrito()

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	})

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true)

		try {
			const { error } = await supabase.from('contact_messages').insert([
				{
					name: data.name,
					email: data.email,
					message: data.message,
				},
			])

			if (error) {
				throw error
			}

			toast({
				title: '¡Mensaje enviado!',
				description: 'Te contactaremos pronto. Gracias por escribirnos.',
			})

			form.reset()
		} catch (error) {
			console.error('Error sending message:', error)
			toast({
				title: 'Error',
				description: 'No pudimos enviar tu mensaje. Inténtalo de nuevo.',
				variant: 'destructive',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='min-h-screen bg-white font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main>
				{/* Hero Section */}
				<section className='bg-gradient-to-r from-mystic-lavender to-mystic-rose py-16'>
					<div className='container mx-auto px-4 text-center'>
						<h1 className='font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
							Contacto
						</h1>
						<p className='font-montserrat text-lg text-gray-600 max-w-2xl mx-auto'>
							Estamos acá para acompañarte en tu viaje espiritual. Contactanos y descubrí el poder
							de lo místico.
						</p>
					</div>
				</section>

				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto'>
							{/* Contact Information */}
							<div className='space-y-8'>
								<div>
									<h2 className='font-playfair text-3xl font-bold text-gray-800 mb-6'>
										Información de Contacto
									</h2>
									<p className='font-montserrat text-gray-600 mb-8'>
										¿Tenés alguna pregunta sobre nuestros productos? Estamos acá para
										ayudarte.
									</p>
								</div>

								<div className='space-y-6'>
									<div className='flex items-start space-x-4'>
										<div className='bg-mystic-lavender p-3 rounded-lg'>
											<Mail className='w-6 h-6 text-gray-700' />
										</div>
										<div>
											<h3 className='font-montserrat font-semibold text-gray-800 mb-1'>Email</h3>
											<p className='font-montserrat text-gray-600'>info@universodual.com</p>
										</div>
									</div>

									<div className='flex items-start space-x-4'>
										<div className='bg-mystic-lavender p-3 rounded-lg'>
											<Phone className='w-6 h-6 text-gray-700' />
										</div>
										<div>
											<h3 className='font-montserrat font-semibold text-gray-800 mb-1'>WhatsApp</h3>
											<p className='font-montserrat text-gray-600'>+54 9 11 1234-5678</p>
										</div>
									</div>

									<div className='flex items-start space-x-4'>
										<div className='bg-mystic-lavender p-3 rounded-lg'>
											<Clock className='w-6 h-6 text-gray-700' />
										</div>
										<div>
											<h3 className='font-montserrat font-semibold text-gray-800 mb-1'>Horarios</h3>
											<p className='font-montserrat text-gray-600'>Lunes a Viernes 9:00 - 18:00</p>
										</div>
									</div>

									<div className='flex items-start space-x-4'>
										<div className='bg-mystic-lavender p-3 rounded-lg'>
											<MapPin className='w-6 h-6 text-gray-700' />
										</div>
										<div>
											<h3 className='font-montserrat font-semibold text-gray-800 mb-1'>
												Ubicación
											</h3>
											<p className='font-montserrat text-gray-600'>Buenos Aires, Argentina</p>
										</div>
									</div>
								</div>
							</div>

							{/* Contact Form */}
							<div>
								<Card className='shadow-lg border-0'>
									<CardHeader className='bg-gradient-to-r from-mystic-lavender to-mystic-rose text-center'>
										<CardTitle className='font-playfair text-2xl text-gray-800'>
											Envíanos un Mensaje
										</CardTitle>
										<CardDescription className='font-montserrat text-gray-600'>
											Completa el formulario y te responderemos pronto
										</CardDescription>
									</CardHeader>
									<CardContent className='p-6'>
										<Form {...form}>
											<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
												<FormField
													control={form.control}
													name='name'
													render={({ field }) => (
														<FormItem>
															<FormLabel className='font-montserrat text-gray-700'>
																Nombre completo
															</FormLabel>
															<FormControl>
																<Input
																	placeholder='Tu nombre completo'
																	className='font-montserrat'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name='email'
													render={({ field }) => (
														<FormItem>
															<FormLabel className='font-montserrat text-gray-700'>Email</FormLabel>
															<FormControl>
																<Input
																	type='email'
																	placeholder='tu@email.com'
																	className='font-montserrat'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name='message'
													render={({ field }) => (
														<FormItem>
															<FormLabel className='font-montserrat text-gray-700'>
																Mensaje
															</FormLabel>
															<FormControl>
																<Textarea
																	placeholder='Cuéntanos en qué podemos ayudarte...'
																	className='font-montserrat min-h-[120px] resize-none'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<Button
													type='submit'
													disabled={isSubmitting}
													className='w-full bg-gradient-to-r from-mystic-lavender to-mystic-rose hover:from-mystic-rose hover:to-mystic-gold text-gray-800 font-montserrat font-semibold py-3 transition-all duration-300'
												>
													{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
												</Button>
											</form>
										</Form>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default ContactPage
