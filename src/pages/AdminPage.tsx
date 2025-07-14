import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Users, Package, MessageSquare, Settings, ArrowLeft, BarChart3 } from 'lucide-react'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'

const AdminPage: React.FC = () => {
	const { user, loading: authLoading } = useAuth()
	const navigate = useNavigate()
	const { cartItems } = useCarrito()

	// Verificar permisos - tanto super admin como admin pueden acceder
	const isSuperAdmin = user?.email === 'admin@universodual.com'
	const isAdmin = user?.role === 'admin' || isSuperAdmin

	useEffect(() => {
		if (!authLoading && (!user || !isAdmin)) {
			navigate('/')
		}
	}, [user, authLoading, navigate, isAdmin])

	// Obtener estadísticas rápidas
	const getQuickStats = () => {
		const users = JSON.parse(localStorage.getItem('app_users') || '[]')
		const contactMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]')
		const newMessages = contactMessages.filter((msg: any) => msg.status === 'new').length

		return {
			totalUsers: users.length,
			totalMessages: contactMessages.length,
			newMessages: newMessages,
		}
	}

	const stats = getQuickStats()

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

	if (!user || !isAdmin) {
		return null
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-cream via-mystic-lavender/10 to-mystic-beige/20 font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-8'>
				<div className='max-w-6xl mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/')}
							className='p-2 hover:bg-white rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<div>
							<h1 className='font-playfair text-3xl font-bold text-gray-800 flex items-center gap-3'>
								<Settings className='w-8 h-8 text-mystic-gold' />
								Panel de Administración
							</h1>
							<p className='text-gray-600 mt-2'>
								Bienvenido/a, {user.full_name || user.email} -
								{isSuperAdmin ? ' Super Administrador' : ' Administrador'}
							</p>
						</div>
					</div>

					{/* Quick Stats */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Total Usuarios</CardTitle>
								<Users className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{stats.totalUsers}</div>
								<p className='text-xs text-muted-foreground'>Usuarios registrados</p>
							</CardContent>
						</Card>

						{isSuperAdmin && (
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>Mensajes Contacto</CardTitle>
									<MessageSquare className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>{stats.totalMessages}</div>
									<p className='text-xs text-muted-foreground'>
										{stats.newMessages} nuevos sin leer
									</p>
								</CardContent>
							</Card>
						)}

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Productos</CardTitle>
								<Package className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>24</div>
								<p className='text-xs text-muted-foreground'>Productos activos</p>
							</CardContent>
						</Card>
					</div>

					{/* Admin Sections */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* User Management - Solo super admin */}
						{isSuperAdmin && (
							<Link to='/admin/usuarios'>
								<Card className='hover:shadow-lg transition-shadow cursor-pointer'>
									<CardHeader>
										<CardTitle className='flex items-center gap-3'>
											<Users className='w-6 h-6 text-mystic-gold' />
											Gestión de Usuarios
										</CardTitle>
										<CardDescription>
											Administra usuarios, roles y permisos del sistema
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='space-y-2'>
											<div className='flex justify-between text-sm'>
												<span>Total usuarios:</span>
												<span className='font-semibold'>{stats.totalUsers}</span>
											</div>
											<div className='text-xs text-gray-500'>
												Crear, editar, eliminar y cambiar roles de usuarios
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						)}

						{/* Contact Management - Solo super admin */}
						{isSuperAdmin && (
							<Link to='/admin/contactos'>
								<Card className='hover:shadow-lg transition-shadow cursor-pointer'>
									<CardHeader>
										<CardTitle className='flex items-center gap-3'>
											<MessageSquare className='w-6 h-6 text-mystic-gold' />
											Mensajes de Contacto
											{stats.newMessages > 0 && (
												<span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
													{stats.newMessages}
												</span>
											)}
										</CardTitle>
										<CardDescription>
											Revisa y gestiona los mensajes del formulario de contacto
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='space-y-2'>
											<div className='flex justify-between text-sm'>
												<span>Total mensajes:</span>
												<span className='font-semibold'>{stats.totalMessages}</span>
											</div>
											<div className='flex justify-between text-sm'>
												<span>Nuevos sin leer:</span>
												<span className='font-semibold text-red-600'>{stats.newMessages}</span>
											</div>
											<div className='text-xs text-gray-500'>
												Ver, responder y gestionar mensajes de contacto
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						)}

						{/* Product Management - Ambos admin y super admin */}
						<Link to='/admin/productos'>
							<Card className='hover:shadow-lg transition-shadow cursor-pointer'>
								<CardHeader>
									<CardTitle className='flex items-center gap-3'>
										<Package className='w-6 h-6 text-mystic-gold' />
										Gestión de Productos
									</CardTitle>
									<CardDescription>
										Administra el catálogo de productos y inventario
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-2'>
										<div className='flex justify-between text-sm'>
											<span>Productos activos:</span>
											<span className='font-semibold'>24</span>
										</div>
										<div className='text-xs text-gray-500'>
											Crear, editar y eliminar productos del catálogo
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>

						{/* Analytics - Placeholder */}
						<Card className='hover:shadow-lg transition-shadow'>
							<CardHeader>
								<CardTitle className='flex items-center gap-3'>
									<BarChart3 className='w-6 h-6 text-mystic-gold' />
									Analíticas
								</CardTitle>
								<CardDescription>Visualiza estadísticas y métricas del negocio</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<div className='text-xs text-gray-500'>
										Próximamente: Reportes de ventas, usuarios activos, productos más vendidos
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	)
}

export default AdminPage
