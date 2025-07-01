import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import supabase from '@/integrations/supabase/client'

interface AuthContextType {
	user: User | null
	session: Session | null
	loading: boolean
	signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
	signIn: (email: string, password: string) => Promise<{ error: any }>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
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

	// Load auth state from localStorage on mount
	useEffect(() => {
		const savedSession = localStorage.getItem('supabase_session')
		const savedUser = localStorage.getItem('supabase_user')

		if (savedSession && savedUser) {
			try {
				const parsedSession = JSON.parse(savedSession)
				const parsedUser = JSON.parse(savedUser)
				setSession(parsedSession)
				setUser(parsedUser)
			} catch (error) {
				console.error('Error parsing saved auth data:', error)
				localStorage.removeItem('supabase_session')
				localStorage.removeItem('supabase_user')
			}
		}

		// Set up auth state listener
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log('Auth state changed:', event, session)
			setSession(session)
			setUser(session?.user ?? null)
			setLoading(false)

			// Save to localStorage
			if (session && session.user) {
				localStorage.setItem('supabase_session', JSON.stringify(session))
				localStorage.setItem('supabase_user', JSON.stringify(session.user))
			} else {
				localStorage.removeItem('supabase_session')
				localStorage.removeItem('supabase_user')
			}
		})

		// Check for existing session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
			setUser(session?.user ?? null)
			setLoading(false)

			// Save to localStorage
			if (session && session.user) {
				localStorage.setItem('supabase_session', JSON.stringify(session))
				localStorage.setItem('supabase_user', JSON.stringify(session.user))
			}
		})

		return () => subscription.unsubscribe()
	}, [])

	const signUp = async (email: string, password: string, fullName?: string) => {
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
		return { error }
	}

	const signIn = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})
		return { error }
	}

	const signOut = async () => {
		await supabase.auth.signOut()
		// Clear localStorage
		localStorage.removeItem('supabase_session')
		localStorage.removeItem('supabase_user')
	}

	const value = {
		user,
		session,
		loading,
		signUp,
		signIn,
		signOut,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
