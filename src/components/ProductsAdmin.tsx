import React, { useState, useEffect } from 'react'
import { useProducts } from '../contexts/ProductsContext'
import { MockProduct } from '../services/mockApi'
import ProductForm from './ProductForm'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
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
} from './ui/alert-dialog'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

const ProductsAdmin: React.FC = () => {
	const {
		products,
		loading,
		error,
		fetchProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		clearError,
	} = useProducts()

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [editingProduct, setEditingProduct] = useState<MockProduct | null>(null)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	const handleCreateProduct = async (productData: Omit<MockProduct, 'id'>) => {
		try {
			await createProduct(productData)
			setIsCreateDialogOpen(false)
		} catch (error) {
			// Error handling is done in the context
		}
	}

	const handleUpdateProduct = async (productData: Partial<MockProduct>) => {
		if (!editingProduct) return

		try {
			await updateProduct(editingProduct.id, productData)
			setIsEditDialogOpen(false)
			setEditingProduct(null)
		} catch (error) {
			// Error handling is done in the context
		}
	}

	const handleDeleteProduct = async (product: MockProduct) => {
		try {
			await deleteProduct(product.id)
		} catch (error) {
			// Error handling is done in the context
		}
	}

	const openEditDialog = (product: MockProduct) => {
		setEditingProduct(product)
		setIsEditDialogOpen(true)
	}

	const closeEditDialog = () => {
		setIsEditDialogOpen(false)
		setEditingProduct(null)
	}

	if (loading && products.length === 0) {
		return <LoadingSpinner />
	}

	if (error) {
		return <ErrorMessage message={error} onRetry={fetchProducts} />
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h2 className='font-playfair text-3xl font-bold text-gray-800'>
						Administración de Productos
					</h2>
					<p className='text-gray-600 mt-2'>Gestiona el catálogo de productos de tu tienda</p>
				</div>

				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className='bg-mystic-beige hover:bg-mystic-gold text-gray-800'>
							<Plus className='w-4 h-4 mr-2' />
							Agregar Producto
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>Crear Nuevo Producto</DialogTitle>
							<DialogDescription>
								Completa todos los campos para agregar un nuevo producto al catálogo.
							</DialogDescription>
						</DialogHeader>
						<ProductForm
							onSubmit={handleCreateProduct}
							onCancel={() => setIsCreateDialogOpen(false)}
							isLoading={loading}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<p className='text-red-800'>{error}</p>
					<Button variant='outline' size='sm' onClick={clearError} className='mt-2'>
						Cerrar
					</Button>
				</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map((product) => (
					<Card key={product.id} className='overflow-hidden'>
						<div className='relative h-48'>
							<img
								src={product.image}
								alt={product.name}
								className='w-full h-full object-cover'
								onError={(e) => {
									const target = e.target as HTMLImageElement
									target.src = '/placeholder.svg'
								}}
							/>
							{product.featured && (
								<div className='absolute top-2 right-2 bg-mystic-gold text-white px-2 py-1 rounded-full text-xs'>
									Destacado
								</div>
							)}
						</div>

						<CardHeader className='pb-2'>
							<CardTitle className='font-playfair text-lg'>{product.name}</CardTitle>
							<div className='flex justify-between items-center'>
								<span className='text-2xl font-bold text-mystic-gold'>
									${product.price.toFixed(2)}
								</span>
								<span className='text-sm text-gray-500'>Stock: {product.stock}</span>
							</div>
						</CardHeader>

						<CardContent className='pt-0'>
							<p className='text-gray-600 text-sm mb-4 line-clamp-2'>{product.description}</p>

							<div className='flex space-x-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={() => openEditDialog(product)}
									className='flex-1'
								>
									<Edit className='w-4 h-4 mr-1' />
									Editar
								</Button>

								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant='outline' size='sm' className='text-red-600 hover:text-red-700'>
											<Trash2 className='w-4 h-4' />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
											<AlertDialogDescription>
												Esta acción no se puede deshacer. El producto "{product.name}" será
												eliminado permanentemente del catálogo.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancelar</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDeleteProduct(product)}
												className='bg-red-600 hover:bg-red-700'
											>
												Eliminar
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{products.length === 0 && !loading && (
				<div className='text-center py-12'>
					<div className='w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
						<Eye className='w-8 h-8 text-gray-400' />
					</div>
					<h3 className='font-playfair text-xl font-semibold text-gray-700 mb-2'>
						No hay productos
					</h3>
					<p className='text-gray-500 mb-4'>Comienza agregando tu primer producto al catálogo.</p>
					<Button
						onClick={() => setIsCreateDialogOpen(true)}
						className='bg-mystic-beige hover:bg-mystic-gold text-gray-800'
					>
						<Plus className='w-4 h-4 mr-2' />
						Agregar Primer Producto
					</Button>
				</div>
			)}

			{/* Edit Product Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle>Editar Producto</DialogTitle>
						<DialogDescription>Modifica los campos que desees actualizar.</DialogDescription>
					</DialogHeader>
					{editingProduct && (
						<ProductForm
							product={editingProduct}
							onSubmit={handleUpdateProduct}
							onCancel={closeEditDialog}
							isLoading={loading}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ProductsAdmin
