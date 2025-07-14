import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Users, MessageSquare, Package } from 'lucide-react'

interface AdminStatsProps {
	totalUsers: number
	totalMessages: number
	newMessages: number
	isSuperAdmin: boolean
}

const AdminStats: React.FC<AdminStatsProps> = ({
	totalUsers,
	totalMessages,
	newMessages,
	isSuperAdmin,
}) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Total Usuarios</CardTitle>
					<Users className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{totalUsers}</div>
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
						<div className='text-2xl font-bold'>{totalMessages}</div>
						<p className='text-xs text-muted-foreground'>{newMessages} nuevos sin leer</p>
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
	)
}

export default AdminStats
