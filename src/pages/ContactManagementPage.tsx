import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../components/ui/alert-dialog'
import { useToast } from '../hooks/use-toast'
import {
	MessageSquare,
	Eye,
	Trash2,
	ArrowLeft,
	Clock,
	CheckCircle,
	AlertCircle,
} from 'lucide-react'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'

interface ContactMessage {
	id: string
	name: string
	email: string
	message: string
	status: 'new' | 'read' | 'responded'
	created_at: string
}

const ContactManagementPage: React.FC = () => {
	const { user, loading: authLoading } = useAuth()
	const navigate = useNavigate()
	const { toast } = useToast()
	const { cartItems } = useCarrito()

	const [messages, setMessages] = useState<ContactMessage[]>([])
	const [loading, setLoading] = useState(false)

	// Verificar permisos
	useEffect(() => {
		if (!authLoading && (!user || user.email !== 'admin@universodual.com')) {
			navigate('/')
		}
	}, [user, authLoading, navigate])

	// Cargar mensajes
	useEffect(() => {
		if (user && user.email === 'admin@universodual.com') {
			loadMessages()
		}
	}, [user])

	const loadMessages = () => {
		try {
			const savedMessages = localStorage.getItem('contact_messages')
			const messagesData = savedMessages ? JSON.parse(savedMessages) : []
			setMessages(messagesData)
		} catch (error) {
			console.error('Error loading messages:', error)
			toast({
				title: 'Error',
				description: 'No se pudieron cargar los mensajes',
				variant: 'destructive',
			})
		}
	}

	const updateMessageStatus = async (
		messageId: string,
		newStatus: 'new' | 'read' | 'responded'
	) => {
		setLoading(true)
		try {
			const updatedMessages = messages.map((msg) =>
				msg.id === messageId ? { ...msg, status: newStatus } : msg
			)

			localStorage.setItem('contact_messages', JSON.stringify(updatedMessages))
			setMessages(updatedMessages)

			toast({
				title: '¡Estado actualizado!',
				description: 'El estado del mensaje se ha actualizado correctamente',
			})
		} catch (error) {
			toast({
				title: 'Error',
				description: 'No se pudo actualizar el estado del mensaje',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}

	const deleteMessage = async (messageId: string) => {
		setLoading(true)
		try {
			const filteredMessages = messages.filter((msg) => msg.id !== messageId)
			localStorage.setItem('contact_messages', JSON.stringify(filteredMessages))
			setMessages(filteredMessages)

			toast({
				title: '¡Mensaje eliminado!',
				description: 'El mensaje ha sido eliminado correctamente',
			})
		} catch (error) {
			toast({
				title: 'Error',
				description: 'No se pudo eliminar el mensaje',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'new':
				return <AlertCircle className='w-4 h-4 text-red-500' />
			case 'read':
				return <Eye className='w-4 h-4 text-yellow-500' />
			case 'responded':
				return <CheckCircle className='w-4 h-4 text-green-500' />
			default:
				return <Clock className='w-4 h-4 text-gray-500' />
		}
	}

	const getStatusLabel = (status: string) => {
		switch (status) {
			case 'new':
				return 'Nuevo'
			case 'read':
				return 'Leído'
			case 'responded':
				return 'Respondido'
			default:
				return 'Desconocido'
		}
	}

	// Estadísticas rápidas
	const stats = {
		total: messages.length,
		new: messages.filter((m) => m.status === 'new').length,
		read: messages.filter((m) => m.status === 'read').length,
		responded: messages.filter((m) => m.status === 'responded').length,
	}

	if (authLoading) {
		return (
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />
				<div className='flex items-center justify-center min-h-[400px]'>
					<div className='text-center'>Cargando...</div>
				</div>
			</div>
		)
	}

	if (!user || user.email !== 'admin@universodual.com') {
		return null
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-lavender via-mystic-cream to-mystic-rose font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-8'>
				<div className='max-w-7xl mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/admin')}
							className='p-2 hover:bg-white rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<div>
							<h1 className='font-playfair text-3xl font-bold text-gray-800 flex items-center gap-3'>
								<MessageSquare className='w-8 h-8 text-mystic-gold' />
								Gestión de Mensajes de Contacto
							</h1>
							<p className='text-gray-600 mt-2'>
								Panel para gestionar todos los mensajes recibidos del formulario de contacto
							</p>
						</div>
					</div>

					{/* Statistics Cards */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Total Mensajes</CardTitle>
								<MessageSquare className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{stats.total}</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Nuevos</CardTitle>
								<AlertCircle className='h-4 w-4 text-red-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold text-red-600'>{stats.new}</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Leídos</CardTitle>
								<Eye className='h-4 w-4 text-yellow-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold text-yellow-600'>{stats.read}</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Respondidos</CardTitle>
								<CheckCircle className='h-4 w-4 text-green-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold text-green-600'>{stats.responded}</div>
							</CardContent>
						</Card>
					</div>

					{/* Messages Table */}
					<Card>
						<CardHeader>
							<CardTitle>Lista de Mensajes</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Estado</TableHead>
										<TableHead>Nombre</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Mensaje</TableHead>
										<TableHead>Fecha</TableHead>
										<TableHead>Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{messages.map((message) => (
										<TableRow key={message.id}>
											<TableCell>
												<div className='flex items-center gap-2'>
													{getStatusIcon(message.status)}
													<span className='text-sm'>{getStatusLabel(message.status)}</span>
												</div>
											</TableCell>
											<TableCell className='font-medium'>{message.name}</TableCell>
											<TableCell>{message.email}</TableCell>
											<TableCell>
												<div className='max-w-xs truncate' title={message.message}>
													{message.message}
												</div>
											</TableCell>
											<TableCell>
												{new Date(message.created_at).toLocaleDateString('es-ES')}
											</TableCell>
											<TableCell>
												<div className='flex items-center gap-2'>
													<Select
														value={message.status}
														onValueChange={(value: 'new' | 'read' | 'responded') =>
															updateMessageStatus(message.id, value)
														}
														disabled={loading}
													>
														<SelectTrigger className='w-32'>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value='new'>Nuevo</SelectItem>
															<SelectItem value='read'>Leído</SelectItem>
															<SelectItem value='responded'>Respondido</SelectItem>
														</SelectContent>
													</Select>

													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button
																variant='outline'
																size='sm'
																className='text-red-600 hover:text-red-700'
																disabled={loading}
															>
																<Trash2 className='w-4 h-4' />
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>¿Eliminar mensaje?</AlertDialogTitle>
																<AlertDialogDescription>
																	Esta acción no se puede deshacer. El mensaje de "{message.name}"
																	será eliminado permanentemente.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancelar</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() => deleteMessage(message.id)}
																	className='bg-red-600 hover:bg-red-700'
																>
																	Eliminar
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{messages.length === 0 && (
								<div className='text-center py-8'>
									<MessageSquare className='w-12 h-12 mx-auto mb-4 text-gray-400' />
									<p className='text-gray-500'>No hay mensajes de contacto</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}

export default ContactManagementPage
