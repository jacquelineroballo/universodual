import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useToast } from '../hooks/use-toast'

const AuthPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState('')
	const [loading, setLoading] = useState(false)

	const { signIn, signUp, user } = useAuth()
	const navigate = useNavigate()
	const { toast } = useToast()

	// Redirect if already authenticated
	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			if (isLogin) {
				const { error } = await signIn(email, password)
				if (error) {
					toast({
						title: 'Error al iniciar sesión',
						description: error.message,
						variant: 'destructive',
					})
				} else {
					toast({
						title: '¡Bienvenido!',
						description: 'Has iniciado sesión correctamente',
					})
					navigate('/')
				}
			} else {
				const { error } = await signUp(email, password, fullName)
				if (error) {
					toast({
						title: 'Error al registrarse',
						description: error.message,
						variant: 'destructive',
					})
				} else {
					toast({
						title: '¡Registro exitoso!',
						description: 'Revisa tu email para confirmar tu cuenta',
					})
				}
			}
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Algo salió mal. Intenta nuevamente.',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-lavender to-mystic-cream flex items-center justify-center p-4'>
			<div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
				<div className='text-center mb-8'>
					<h1 className='font-playfair text-3xl font-bold text-gray-800 mb-2'>Universo Dual</h1>
					<p className='font-montserrat text-gray-600'>
						{isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta mágica'}
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					{!isLogin && (
						<div>
							<label
								htmlFor='fullName'
								className='block text-sm font-montserrat font-medium text-gray-700 mb-2'
							>
								Nombre completo
							</label>
							<Input
								id='fullName'
								type='text'
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required={!isLogin}
								className='w-full'
								placeholder='Tu nombre completo'
							/>
						</div>
					)}

					<div>
						<label
							htmlFor='email'
							className='block text-sm font-montserrat font-medium text-gray-700 mb-2'
						>
							Email
						</label>
						<Input
							id='email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='w-full'
							placeholder='tu@email.com'
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block text-sm font-montserrat font-medium text-gray-700 mb-2'
						>
							Contraseña
						</label>
						<Input
							id='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='w-full'
							placeholder='••••••••'
							minLength={6}
						/>
					</div>

					<Button
						type='submit'
						disabled={loading}
						className='w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-semibold py-3'
					>
						{loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
					</Button>
				</form>

				<div className='mt-6 text-center'>
					<button
						onClick={() => setIsLogin(!isLogin)}
						className='font-montserrat text-sm text-gray-600 hover:text-gray-800 underline'
					>
						{isLogin
							? '¿No tienes cuenta? Regístrate aquí'
							: '¿Ya tienes cuenta? Inicia sesión aquí'}
					</button>
				</div>

				<div className='mt-6 text-center'>
					<button
						onClick={() => navigate('/')}
						className='font-montserrat text-sm text-gray-500 hover:text-gray-700'
					>
						← Volver al inicio
					</button>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
