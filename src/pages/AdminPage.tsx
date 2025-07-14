import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Users, Package, MessageSquare, BarChart3 } from 'lucide-react'
import Header from '../components/Header'
import AdminHeader from '../components/AdminHeader'
import AdminStats from '../components/AdminStats'
import AdminSection from '../components/AdminSection'
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

	const adminSections = [
		// User Management - Solo super admin
		...(isSuperAdmin
			? [
					{
						title: 'Gestión de Usuarios',
						description: 'Administra usuarios, roles y permisos del sistema',
						icon: Users,
						link: '/admin/usuarios',
						stats: [{ label: 'Total usuarios', value: stats.totalUsers }],
						note: 'Crear, editar, eliminar y cambiar roles de usuarios',
					},
			  ]
			: []),

		// Contact Management - Solo super admin
		...(isSuperAdmin
			? [
					{
						title: 'Mensajes de Contacto',
						description: 'Revisa y gestiona los mensajes del formulario de contacto',
						icon: MessageSquare,
						link: '/admin/contactos',
						stats: [
							{ label: 'Total mensajes', value: stats.totalMessages },
							{ label: 'Nuevos sin leer', value: stats.newMessages, highlight: true },
						],
						badge: stats.newMessages > 0 ? { text: 'Nuevos', count: stats.newMessages } : undefined,
						note: 'Ver, responder y gestionar mensajes de contacto',
					},
			  ]
			: []),

		// Product Management - Ambos admin y super admin
		{
			title: 'Gestión de Productos',
			description: 'Administra el catálogo de productos y inventario',
			icon: Package,
			link: '/admin/productos',
			stats: [{ label: 'Productos activos', value: 24 }],
			note: 'Crear, editar y eliminar productos del catálogo',
		},

		// Analytics - Placeholder
		{
			title: 'Analíticas',
			description: 'Visualiza estadísticas y métricas del negocio',
			icon: BarChart3,
			note: 'Próximamente: Reportes de ventas, usuarios activos, productos más vendidos',
		},
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-lavender via-mystic-cream to-mystic-rose font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<main className='container mx-auto px-4 py-8'>
				<div className='max-w-6xl mx-auto'>
					<AdminHeader userName={user.full_name || user.email} isSuperAdmin={isSuperAdmin} />

					<AdminStats
						totalUsers={stats.totalUsers}
						totalMessages={stats.totalMessages}
						newMessages={stats.newMessages}
						isSuperAdmin={isSuperAdmin}
					/>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{adminSections.map((section, index) => (
							<AdminSection
								key={index}
								title={section.title}
								description={section.description}
								icon={section.icon}
								link={section.link}
								stats={section.stats}
								badge={section.badge}
								note={section.note}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	)
}

export default AdminPage
