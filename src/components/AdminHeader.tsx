import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'

interface AdminHeaderProps {
	userName: string
	isSuperAdmin: boolean
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userName, isSuperAdmin }) => {
	const navigate = useNavigate()

	return (
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
					Bienvenido/a, {userName} -{isSuperAdmin ? ' Super Administrador' : ' Administrador'}
				</p>
			</div>
		</div>
	)
}

export default AdminHeader
