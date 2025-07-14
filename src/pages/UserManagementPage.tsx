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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useToast } from '../hooks/use-toast'
import { Users, Shield, UserX, Crown, ArrowLeft, Plus } from 'lucide-react'
import Header from '../components/Header'
import { useCarrito } from '../contexts/CarritoContext'

interface User {
	id: string
	email: string
	full_name?: string
	role: 'admin' | 'user'
	created_at: string
}

const UserManagementPage: React.FC = () => {
	const {
		user,
		loading: authLoading,
		isAdmin,
		getAllUsers,
		updateUserRole,
		deleteUser,
		signUp,
	} = useAuth()
	const navigate = useNavigate()
	const { toast } = useToast()
	const { cartItems } = useCarrito()

	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [newUser, setNewUser] = useState({
		email: '',
		password: '',
		fullName: '',
		role: 'user' as 'admin' | 'user',
	})

	// Verificar permisos - solo super admin
	useEffect(() => {
		if (!authLoading && (!user || user.email !== 'admin@universodual.com')) {
			navigate('/')
		}
	}, [user, authLoading, navigate])

	// Cargar usuarios
	useEffect(() => {
		if (user && user.email === 'admin@universodual.com') {
			loadUsers()
		}
	}, [user])

	const loadUsers = () => {
		const allUsers = getAllUsers()
		setUsers(allUsers)
	}

	const handleCreateUser = async () => {
		if (!newUser.email || !newUser.password) {
			toast({
				title: 'Error',
				description: 'Email y contraseña son obligatorios',
				variant: 'destructive',
			})
			return
		}

		setLoading(true)
		try {
			const { error } = await signUp(newUser.email, newUser.password, newUser.fullName)
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					variant: 'destructive',
				})
			} else {
				// Si el rol no es 'user', actualizarlo
				if (newUser.role !== 'user') {
					const allUsers = getAllUsers()
					const createdUser = allUsers.find((u) => u.email === newUser.email)
					if (createdUser) {
						await updateUserRole(createdUser.id, newUser.role)
					}
				}

				toast({
					title: '¡Usuario creado!',
					description: `Usuario ${newUser.email} creado correctamente`,
				})

				setIsCreateDialogOpen(false)
				setNewUser({ email: '', password: '', fullName: '', role: 'user' })
				loadUsers()
			}
		} catch (error) {
			toast({
				title: 'Error',
				description: 'No se pudo crear el usuario',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}

	const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
		setLoading(true)
		try {
			const { error } = await updateUserRole(userId, newRole)
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					variant: 'destructive',
				})
			} else {
				toast({
					title: '¡Rol actualizado!',
					description: 'El rol del usuario se ha actualizado correctamente',
				})
				loadUsers()
			}
		} catch (error) {
			toast({
				title: 'Error',
				description: 'No se pudo actualizar el rol del usuario',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteUser = async (userId: string, userEmail: string) => {
		setLoading(true)
		try {
			const { error } = await deleteUser(userId)
			if (error) {
				toast({
					title: 'Error',
					description: error.message,
					variant: 'destructive',
				})
			} else {
				toast({
					title: '¡Usuario eliminado!',
					description: `El usuario ${userEmail} ha sido eliminado`,
				})
				loadUsers()
			}
		} catch (error) {
			toast({
				title: 'Error',
				description: 'No se pudo eliminar el usuario',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
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
				<div className='max-w-6xl mx-auto'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-8'>
						<button
							onClick={() => navigate('/admin')}
							className='p-2 hover:bg-white rounded-full transition-colors'
						>
							<ArrowLeft className='w-5 h-5 text-gray-600' />
						</button>
						<div className='flex-1'>
							<h1 className='font-playfair text-3xl font-bold text-gray-800 flex items-center gap-3'>
								<Users className='w-8 h-8 text-mystic-gold' />
								Gestión de Usuarios
							</h1>
							<p className='text-gray-600 mt-2'>
								Panel exclusivo para super administradores - Gestiona usuarios y roles
							</p>
						</div>

						{/* Botón Crear Usuario */}
						<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
							<DialogTrigger asChild>
								<Button className='bg-mystic-beige hover:bg-mystic-gold rounded-xl text-gray-800'>
									<Plus className='w-4 h-4 mr-2' />
									Crear Usuario
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Crear Nuevo Usuario</DialogTitle>
									<DialogDescription>
										Completa los datos para crear un nuevo usuario en el sistema.
									</DialogDescription>
								</DialogHeader>
								<div className='space-y-4'>
									<div>
										<Label htmlFor='email'>Email *</Label>
										<Input
											id='email'
											type='email'
											value={newUser.email}
											onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
											placeholder='usuario@ejemplo.com'
										/>
									</div>
									<div>
										<Label htmlFor='password'>Contraseña *</Label>
										<Input
											id='password'
											type='password'
											value={newUser.password}
											onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
											placeholder='Contraseña segura'
										/>
									</div>
									<div>
										<Label htmlFor='fullName'>Nombre Completo</Label>
										<Input
											id='fullName'
											type='text'
											value={newUser.fullName}
											onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
											placeholder='Nombre completo del usuario'
										/>
									</div>
									<div>
										<Label htmlFor='role'>Rol</Label>
										<Select
											value={newUser.role}
											onValueChange={(value: 'admin' | 'user') =>
												setNewUser({ ...newUser, role: value })
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='user'>Usuario</SelectItem>
												<SelectItem value='admin'>Administrador</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className='flex justify-end gap-2 mt-6'>
									<Button
										variant='outline'
										onClick={() => setIsCreateDialogOpen(false)}
										disabled={loading}
									>
										Cancelar
									</Button>
									<Button
										onClick={handleCreateUser}
										disabled={loading}
										className='bg-mystic-beige hover:bg-mystic-gold text-gray-800'
									>
										{loading ? 'Creando...' : 'Crear Usuario'}
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</div>

					{/* Statistics Cards */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Total Usuarios</CardTitle>
								<Users className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{users.length}</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Administradores</CardTitle>
								<Crown className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{users.filter((u) => u.role === 'admin').length}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Usuarios Regulares</CardTitle>
								<Shield className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{users.filter((u) => u.role === 'user').length}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Users Table */}
					<Card>
						<CardHeader>
							<CardTitle>Lista de Usuarios</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Email</TableHead>
										<TableHead>Nombre</TableHead>
										<TableHead>Rol</TableHead>
										<TableHead>Fecha de Registro</TableHead>
										<TableHead>Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((userItem) => (
										<TableRow key={userItem.id}>
											<TableCell className='font-medium'>{userItem.email}</TableCell>
											<TableCell>{userItem.full_name || 'Sin nombre'}</TableCell>
											<TableCell>
												<div className='flex items-center gap-2'>
													{userItem.role === 'admin' ? (
														<Crown className='w-4 h-4 text-mystic-gold' />
													) : (
														<Shield className='w-4 h-4 text-gray-500' />
													)}
													<span
														className={
															userItem.role === 'admin' ? 'text-mystic-gold font-semibold' : ''
														}
													>
														{userItem.role === 'admin' ? 'Administrador' : 'Usuario'}
													</span>
												</div>
											</TableCell>
											<TableCell>
												{new Date(userItem.created_at).toLocaleDateString('es-ES')}
											</TableCell>
											<TableCell>
												<div className='flex items-center gap-2'>
													{userItem.email !== 'admin@universodual.com' && (
														<>
															<Select
																value={userItem.role}
																onValueChange={(value: 'admin' | 'user') =>
																	handleRoleChange(userItem.id, value)
																}
																disabled={loading}
															>
																<SelectTrigger className='w-32'>
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value='user'>Usuario</SelectItem>
																	<SelectItem value='admin'>Admin</SelectItem>
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
																		<UserX className='w-4 h-4' />
																	</Button>
																</AlertDialogTrigger>
																<AlertDialogContent>
																	<AlertDialogHeader>
																		<AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
																		<AlertDialogDescription>
																			Esta acción no se puede deshacer. El usuario "{userItem.email}
																			" será eliminado permanentemente del sistema.
																		</AlertDialogDescription>
																	</AlertDialogHeader>
																	<AlertDialogFooter>
																		<AlertDialogCancel>Cancelar</AlertDialogCancel>
																		<AlertDialogAction
																			onClick={() => handleDeleteUser(userItem.id, userItem.email)}
																			className='bg-red-600 hover:bg-red-700'
																		>
																			Eliminar
																		</AlertDialogAction>
																	</AlertDialogFooter>
																</AlertDialogContent>
															</AlertDialog>
														</>
													)}
													{userItem.email === 'admin@universodual.com' && (
														<span className='text-sm text-gray-500 italic'>
															Super Admin (Protegido)
														</span>
													)}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{users.length === 0 && (
								<div className='text-center py-8'>
									<Users className='w-12 h-12 mx-auto mb-4 text-gray-400' />
									<p className='text-gray-500'>No hay usuarios registrados</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}

export default UserManagementPage
