import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/button'
import { User } from 'lucide-react'

const AuthButton: React.FC = () => {
	const { user, loading } = useAuth()
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
			<Button
				onClick={() => navigate('/mi-cuenta')}
				variant='ghost'
				className='font-montserrat flex items-center gap-2'
			>
				<User className='w-4 h-4' />
				Mi Cuenta
			</Button>
		)
	}

	return (
		<Button
			onClick={() => navigate('/auth')}
			className='bg-mystic-beige hover:bg-mystic-gold transition-colors p-2 rounded-full shadow-md'
		>
			Iniciar Sesión
		</Button>
	)
}

export default AuthButton
