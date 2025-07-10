import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/useAuth'
import { GlobalStateProvider } from './contexts/GlobalStateContext'
import ErrorBoundary from './components/ErrorBoundary'
import Index from './pages/Index'
import AuthPage from './pages/AuthPage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import MyAccountPage from './pages/MyAccountPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
		},
	},
})

const App = () => (
	<ErrorBoundary>
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<TooltipProvider>
					<AuthProvider>
						<GlobalStateProvider>
							<Toaster />
							<Sonner />
							<BrowserRouter>
								<Routes>
									<Route path='/' element={<Index />} />
									<Route path='/auth' element={<AuthPage />} />
									<Route path='/productos' element={<ProductsPage />} />
									<Route path='/categoria/:category' element={<CategoryPage />} />
									<Route path='/producto/:id' element={<ProductDetailPage />} />
									<Route path='/checkout' element={<CheckoutPage />} />
									<Route path='/checkout-success' element={<CheckoutSuccessPage />} />
									<Route path='/mi-cuenta' element={<MyAccountPage />} />
									<Route path='/contacto' element={<ContactPage />} />
									<Route path='*' element={<NotFound />} />
								</Routes>
							</BrowserRouter>
						</GlobalStateProvider>
					</AuthProvider>
				</TooltipProvider>
			</QueryClientProvider>
		</HelmetProvider>
	</ErrorBoundary>
)

export default App
