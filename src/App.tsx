import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Index from './pages/Index'
import AuthPage from './pages/AuthPage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import NotFound from './pages/NotFound'
import OurHistoryPage from './pages/OurHistoryPage'
import MyAccountPage from './pages/MyAccountPage'

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<AuthProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Index />} />
						<Route path='/auth' element={<AuthPage />} />
						<Route path='/categoria/:category' element={<CategoryPage />} />
						<Route path='/producto/:id' element={<ProductDetailPage />} />
						<Route path='/checkout' element={<CheckoutPage />} />
						<Route path='/checkout-success' element={<CheckoutSuccessPage />} />
						<Route path='/nuestra-historia' element={<OurHistoryPage />} />
						<Route path='/mi-cuenta' element={<MyAccountPage />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
)

export default App
