import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/useAuth'
import { CarritoProvider } from './contexts/CarritoContext'
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

const queryClient = new QueryClient()

const App = () => (
	<HelmetProvider>
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<AuthProvider>
					<CarritoProvider>
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
								{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
								<Route path='*' element={<NotFound />} />
							</Routes>
						</BrowserRouter>
					</CarritoProvider>
				</AuthProvider>
			</TooltipProvider>
		</QueryClientProvider>
	</HelmetProvider>
)

export default App
