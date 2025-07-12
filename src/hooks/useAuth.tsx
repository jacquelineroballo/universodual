import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface User {
	id: string
	email: string
	full_name?: string
	role: 'admin' | 'user'
	created_at: string
}

interface AuthContextType {
	user: User | null
	loading: boolean
	isAdmin: boolean
	signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
	signIn: (email: string, password: string) => Promise<{ error: any }>
	signOut: () => Promise<void>
	getAllUsers: () => User[]
	updateUserRole: (userId: string, role: 'admin' | 'user') => Promise<{ error: any }>
	deleteUser: (userId: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		console.error('useAuth must be used within an AuthProvider')
		return {
			user: null,
			loading: false,
			isAdmin: false,
			signUp: async () => ({ error: new Error('Auth not initialized') }),
			signIn: async () => ({ error: new Error('Auth not initialized') }),
			signOut: async () => {},
			getAllUsers: () => [],
			updateUserRole: async () => ({ error: new Error('Auth not initialized') }),
			deleteUser: async () => ({ error: new Error('Auth not initialized') }),
		}
	}
	return context
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	const superAdminEmail = 'admin@universodual.com'

	useEffect(() => {
		console.log('AuthProvider: Initializing auth state')

		const savedUser = localStorage.getItem('current_user')

		if (savedUser) {
			try {
				const parsedUser = JSON.parse(savedUser)
				console.log('AuthProvider: Loaded saved user:', parsedUser.email)
				setUser(parsedUser)
			} catch (error) {
				console.error('Error parsing saved user data:', error)
				localStorage.removeItem('current_user')
			}
		}

		setLoading(false)
	}, [])

	const getAllUsers = (): User[] => {
		try {
			const users = localStorage.getItem('app_users')
			return users ? JSON.parse(users) : []
		} catch (error) {
			console.error('Error getting users:', error)
			return []
		}
	}

	const saveUsers = (users: User[]) => {
		localStorage.setItem('app_users', JSON.stringify(users))
	}

	const signUp = async (email: string, password: string, fullName?: string) => {
		console.log('AuthProvider: Signing up user:', email)

		const users = getAllUsers()
		const existingUser = users.find((u) => u.email === email)

		if (existingUser) {
			return { error: { message: 'Este email ya está registrado' } }
		}

		const newUser: User = {
			id: Date.now().toString(),
			email,
			full_name: fullName || email,
			role: email === superAdminEmail ? 'admin' : 'user',
			created_at: new Date().toISOString(),
		}

		users.push(newUser)
		saveUsers(users)

		// Save password (in a real app, this should be hashed)
		const passwords = JSON.parse(localStorage.getItem('app_passwords') || '{}')
		passwords[email] = password
		localStorage.setItem('app_passwords', JSON.stringify(passwords))

		return { error: null }
	}

	const signIn = async (email: string, password: string) => {
		console.log('AuthProvider: Signing in user:', email)

		const users = getAllUsers()
		const foundUser = users.find((u) => u.email === email)

		if (!foundUser) {
			return { error: { message: 'Usuario no encontrado' } }
		}

		// Check password (in a real app, this should be properly hashed and verified)
		const passwords = JSON.parse(localStorage.getItem('app_passwords') || '{}')
		if (passwords[email] !== password) {
			return { error: { message: 'Contraseña incorrecta' } }
		}

		setUser(foundUser)
		localStorage.setItem('current_user', JSON.stringify(foundUser))

		return { error: null }
	}

	const signOut = async () => {
		console.log('AuthProvider: Signing out user')
		setUser(null)
		localStorage.removeItem('current_user')
	}

	const updateUserRole = async (userId: string, role: 'admin' | 'user') => {
		if (user?.email !== superAdminEmail) {
			return { error: { message: 'No tienes permisos para realizar esta acción' } }
		}

		const users = getAllUsers()
		const userIndex = users.findIndex((u) => u.id === userId)

		if (userIndex === -1) {
			return { error: { message: 'Usuario no encontrado' } }
		}

		users[userIndex].role = role
		saveUsers(users)

		return { error: null }
	}

	const deleteUser = async (userId: string) => {
		if (user?.email !== superAdminEmail) {
			return { error: { message: 'No tienes permisos para realizar esta acción' } }
		}

		const users = getAllUsers()
		const filteredUsers = users.filter((u) => u.id !== userId)
		saveUsers(filteredUsers)

		return { error: null }
	}

	const isAdmin = user?.role === 'admin' || user?.email === superAdminEmail

	const value = {
		user,
		loading,
		isAdmin,
		signUp,
		signIn,
		signOut,
		getAllUsers,
		updateUserRole,
		deleteUser,
	}

	console.log(
		'AuthProvider: Rendering with user:',
		user?.email,
		'loading:',
		loading,
		'isAdmin:',
		isAdmin
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
