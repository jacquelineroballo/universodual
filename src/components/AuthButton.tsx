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
				className='font-montserrat flex items-center gap-2 bg-gradient-to-r from-mystic-lavender/30 to-mystic-rose/30 hover:from-mystic-lavender/50 hover:to-mystic-rose/50 text-gray-800 border border-mystic-gold/20 transition-all duration-300'
			>
				<User className='w-4 h-4' />
				Mi Cuenta
			</Button>
		)
	}

	return (
		<Button
			onClick={() => navigate('/auth')}
			className='bg-gradient-to-r from-mystic-beige to-mystic-gold hover:from-mystic-gold hover:to-mystic-rose text-gray-800 font-montserrat transition-all duration-300 shadow-md hover:shadow-lg'
		>
			Iniciar Sesión
		</Button>
	)
    >
}

export default AuthButton
