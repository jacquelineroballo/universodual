import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import supabase from '@/integrations/supabase/client'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useToast } from '../hooks/use-toast'
import { User, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import { useCart } from '../hooks/useCart'

interface Profile {
	id: string
	email: string | null
	full_name: string | null
	avatar_url: string | null
	shipping_address: string | null
	phone: string | null
	city: string | null
	postal_code: string | null
}

const MyAccountPage: React.FC = () => {
	const { user, loading: authLoading, signOut } = useAuth()
	const navigate = useNavigate()
	const { toast } = useToast()
	const { cartItems } = useCart()

	const [profile, setProfile] = useState<Profile | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const [formData, setFormData] = useState({
		full_name: '',
		shipping_address: '',
		phone: '',
		city: '',
		postal_code: '',
	})

	// Redirect if not authenticated
	useEffect(() => {
		if (!authLoading && !user) {
			navigate('/auth')
		}
	}, [user, authLoading, navigate])

	// Load user profile
	useEffect(() => {
		if (user) {
			loadProfile()
		}
	}, [user])

	const loadProfile = async () => {
		if (!user) return

		try {
			setLoading(true)
			const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

			if (error && error.code !== 'PGRST116') {
				throw error
			}

			if (data) {
				const profileData: Profile = {
					id: data.id,
					email: data.email,
					full_name: data.full_name,
					avatar_url: data.avatar_url,
					shipping_address: data.shipping_address || null,
					phone: data.phone || null,
					city: data.city || null,
					postal_code: data.postal_code || null,
				}

				setProfile(profileData)
				setFormData({
					full_name: profileData.full_name || '',
					shipping_address: profileData.shipping_address || '',
					phone: profileData.phone || '',
					city: profileData.city || '',
					postal_code: profileData.postal_code || '',
				})
			}
		} catch (error) {
			console.error('Error loading profile:', error)
			toast({
				title: 'Error',
				description: 'No se pudo cargar la información del perfil',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}

	const handleSave = async () => {
		if (!user) return

		try {
			setSaving(true)
			const { error } = await supabase.from('profiles').upsert({
				id: user.id,
				email: user.email,
				...formData,
				updated_at: new Date().toISOString(),
			})

			if (error) throw error

			toast({
				title: '¡Perfil actualizado!',
				description: 'Tu información se ha guardado correctamente',
			})

			setIsEditing(false)
			loadProfile()
		} catch (error) {
			console.error('Error saving profile:', error)
			toast({
				title: 'Error',
				description: 'No se pudo guardar la información',
				variant: 'destructive',
			})
		} finally {
			setSaving(false)
		}
	}

	const handleSignOut = async () => {
		await signOut()
		navigate('/')
	}

	if (authLoading || loading) {
		return (
			<div className='min-h-screen bg-white font-montserrat'>
				<Header cartItems={cartItems} onCartClick={() => {}} />
				<div className='flex items-center justify-center py-12'>
					<div className='text-center'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-mystic-gold mx-auto mb-4'></div>
						<p className='text-gray-600'>Cargando...</p>
					</div>
				</div>
			</div>
		)
	}

	if (!user) return null

	return (
		<div className='min-h-screen bg-gradient-to-br from-mystic-lavender/20 to-mystic-cream/20 font-montserrat'>
			<Header cartItems={cartItems} onCartClick={() => {}} />

			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/')}
							className='p-2 hover:bg-white rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<h1 className='font-playfair text-3xl font-bold text-gray-800'>Mi Cuenta</h1>
					</div>

					{/* Profile Card */}
					<div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
						<div className='flex items-center gap-4 mb-6'>
							<div className='w-16 h-16 bg-mystic-lavender rounded-full flex items-center justify-center'>
								<User className='w-8 h-8 text-gray-600' />
							</div>
							<div>
								<h2 className='font-playfair text-xl font-bold text-gray-800'>
									{profile?.full_name || 'Usuario'}
								</h2>
								<p className='text-gray-600'>{user.email}</p>
							</div>
						</div>

						{/* Profile Information */}
						<div className='space-y-6'>
							<div className='grid grid-cols-1 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Nombre completo
									</label>
									{isEditing ? (
										<Input
											value={formData.full_name}
											onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
											placeholder='Tu nombre completo'
										/>
									) : (
										<div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
											<User className='w-4 h-4 text-gray-500' />
											<span>{profile?.full_name || 'No especificado'}</span>
										</div>
									)}
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
									<div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
										<Mail className='w-4 h-4 text-gray-500' />
										<span>{user.email}</span>
									</div>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>Teléfono</label>
									{isEditing ? (
										<Input
											value={formData.phone}
											onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
											placeholder='Tu número de teléfono'
										/>
									) : (
										<div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
											<Phone className='w-4 h-4 text-gray-500' />
											<span>{profile?.phone || 'No especificado'}</span>
										</div>
									)}
								</div>
							</div>

							{/* Shipping Information */}
							<div className='border-t pt-6'>
								<h3 className='font-playfair text-lg font-bold text-gray-800 mb-4'>
									Dirección de Envío
								</h3>

								<div className='space-y-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Dirección
										</label>
										{isEditing ? (
											<Input
												value={formData.shipping_address}
												onChange={(e) =>
													setFormData({ ...formData, shipping_address: e.target.value })
												}
												placeholder='Calle, número, detalles'
											/>
										) : (
											<div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
												<MapPin className='w-4 h-4 text-gray-500' />
												<span>{profile?.shipping_address || 'No especificada'}</span>
											</div>
										)}
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>Ciudad</label>
											{isEditing ? (
												<Input
													value={formData.city}
													onChange={(e) => setFormData({ ...formData, city: e.target.value })}
													placeholder='Ciudad'
												/>
											) : (
												<div className='p-3 bg-gray-50 rounded-lg'>
													<span>{profile?.city || 'No especificada'}</span>
												</div>
											)}
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Código Postal
											</label>
											{isEditing ? (
												<Input
													value={formData.postal_code}
													onChange={(e) =>
														setFormData({ ...formData, postal_code: e.target.value })
													}
													placeholder='C.P.'
												/>
											) : (
												<div className='p-3 bg-gray-50 rounded-lg'>
													<span>{profile?.postal_code || 'No especificado'}</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className='flex gap-4 pt-6 border-t'>
								{isEditing ? (
									<>
										<Button
											onClick={handleSave}
											disabled={saving}
											className='flex-1 bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-medium'
										>
											{saving ? 'Guardando...' : 'Guardar Cambios'}
										</Button>
										<Button
											onClick={() => {
												setIsEditing(false)
												setFormData({
													full_name: profile?.full_name || '',
													shipping_address: profile?.shipping_address || '',
													phone: profile?.phone || '',
													city: profile?.city || '',
													postal_code: profile?.postal_code || '',
												})
											}}
											variant='outline'
											className='flex-1'
										>
											Cancelar
										</Button>
									</>
								) : (
									<Button
										onClick={() => setIsEditing(true)}
										className='flex-1 bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-medium'
									>
										Editar Información
									</Button>
								)}
							</div>

							{/* Sign Out */}
							<div className='pt-6 border-t'>
								<Button
									onClick={handleSignOut}
									variant='outline'
									className='w-full text-red-600 border-red-600 hover:bg-red-50'
								>
									Cerrar Sesión
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccountPage
