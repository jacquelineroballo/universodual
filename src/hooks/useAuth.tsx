import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

interface AuthContextType {
	user: User | null
	session: Session | null
	loading: boolean
	isAdmin: boolean
	signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
	signIn: (email: string, password: string) => Promise<{ error: any }>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		console.error('useAuth must be used within an AuthProvider')
		return {
			user: null,
			session: null,
			loading: false,
			isAdmin: false,
			signUp: async () => ({ error: new Error('Auth not initialized') }),
			signIn: async () => ({ error: new Error('Auth not initialized') }),
			signOut: async () => {},
		}
	}
	return context
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null)
	const [session, setSession] = useState<Session | null>(null)
	const [loading, setLoading] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false)

	// Lista de emails de administradores
	const adminEmails = ['jacqueline.roballo@syloper.com', 'admin@universodual.com']

	useEffect(() => {
		console.log('AuthProvider: Initializing auth state')

		const savedSession = localStorage.getItem('supabase_session')
		const savedUser = localStorage.getItem('supabase_user')

		if (savedSession && savedUser) {
			try {
				const parsedSession = JSON.parse(savedSession)
				const parsedUser = JSON.parse(savedUser)
				console.log('AuthProvider: Loaded saved session')
				setSession(parsedSession)
				setUser(parsedUser)
				setIsAdmin(adminEmails.includes(parsedUser.email))
			} catch (error) {
				console.error('Error parsing saved auth data:', error)
				localStorage.removeItem('supabase_session')
				localStorage.removeItem('supabase_user')
			}
		}

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log('AuthProvider: Auth state changed:', event, session?.user?.email)
			setSession(session)
			setUser(session?.user ?? null)
			setIsAdmin(session?.user ? adminEmails.includes(session.user.email) : false)
			setLoading(false)

			if (session && session.user) {
				localStorage.setItem('supabase_session', JSON.stringify(session))
				localStorage.setItem('supabase_user', JSON.stringify(session.user))
			} else {
				localStorage.removeItem('supabase_session')
				localStorage.removeItem('supabase_user')
			}
		})

		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				console.log('AuthProvider: Got existing session:', session?.user?.email)
				setSession(session)
				setUser(session?.user ?? null)
				setIsAdmin(session?.user ? adminEmails.includes(session.user.email) : false)
				setLoading(false)

				if (session && session.user) {
					localStorage.setItem('supabase_session', JSON.stringify(session))
					localStorage.setItem('supabase_user', JSON.stringify(session.user))
				}
			})
			.catch((error) => {
				console.error('AuthProvider: Error getting session:', error)
				setLoading(false)
			})

		return () => {
			console.log('AuthProvider: Cleaning up subscription')
			subscription.unsubscribe()
		}
	}, [])

	const signUp = async (email: string, password: string, fullName?: string) => {
		console.log('AuthProvider: Signing up user:', email)
		const redirectUrl = `${window.location.origin}/`

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: redirectUrl,
				data: {
					full_name: fullName,
				},
			},
		})

		if (error) {
			console.error('AuthProvider: Sign up error:', error)
		}

		return { error }
	}

	const signIn = async (email: string, password: string) => {
		console.log('AuthProvider: Signing in user:', email)
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			console.error('AuthProvider: Sign in error:', error)
		}

		return { error }
	}

	const signOut = async () => {
		console.log('AuthProvider: Signing out user')
		await supabase.auth.signOut()
		localStorage.removeItem('supabase_session')
		localStorage.removeItem('supabase_user')
	}

	const value = {
		user,
		session,
		loading,
		isAdmin,
		signUp,
		signIn,
		signOut,
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
