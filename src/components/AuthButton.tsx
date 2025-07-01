import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/button'
import { User, LogOut } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const AuthButton: React.FC = () => {
	const { user, signOut, loading } = useAuth()
	const navigate = useNavigate()

	if (loading) {
		return (
			<Button variant='ghost' disabled className='font-montserrat'>
				Cargando...
			</Button>
		)
	}

	if (user) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='ghost' className='font-montserrat flex items-center gap-2'>
						<User className='w-4 h-4' />
						Mi Cuenta
					</Button>
				</DialogTrigger>
				<DialogContent className='max-w-md'>
					<DialogHeader>
						<DialogTitle className='font-playfair text-xl'>Mi Cuenta</DialogTitle>
					</DialogHeader>
					<div className='space-y-4'>
						<div className='text-sm font-montserrat'>
							<p className='text-gray-600'>Email:</p>
							<p className='font-medium'>{user.email}</p>
						</div>
						<Button
							onClick={signOut}
							variant='outline'
							className='w-full font-montserrat flex items-center gap-2'
						>
							<LogOut className='w-4 h-4' />
							Cerrar Sesión
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Button
			onClick={() => navigate('/auth')}
			className='bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat'
		>
			Iniciar Sesión
		</Button>
	)
}

export default AuthButton
