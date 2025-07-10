import React, { useState, useEffect } from 'react'
import { MockProduct } from '../services/mockApi'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface ProductFormProps {
	product?: MockProduct
	onSubmit: (product: Omit<MockProduct, 'id'> | Partial<MockProduct>) => Promise<void>
	onCancel: () => void
	isLoading?: boolean
}

interface FormData {
	name: string
	price: string
	description: string
	category: 'velas' | 'inciensos' | 'cristales' | 'accesorios'
	image: string
	stock: string
	featured: boolean
}

interface FormErrors {
	name?: string
	price?: string
	description?: string
	stock?: string
	image?: string
}

const ProductForm: React.FC<ProductFormProps> = ({
	product,
	onSubmit,
	onCancel,
	isLoading = false,
}) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		price: '',
		description: '',
		category: 'velas',
		image: '',
		stock: '',
		featured: false,
	})

	const [errors, setErrors] = useState<FormErrors>({})

	useEffect(() => {
		if (product) {
			setFormData({
				name: product.name,
				price: product.price.toString(),
				description: product.description,
				category: product.category,
				image: product.image,
				stock: product.stock.toString(),
				featured: product.featured,
			})
		}
	}, [product])

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {}

		// Validar nombre (obligatorio)
		if (!formData.name.trim()) {
			newErrors.name = 'El nombre es obligatorio'
		}

		// Validar precio (mayor a 0)
		const price = parseFloat(formData.price)
		if (!formData.price || isNaN(price) || price <= 0) {
			newErrors.price = 'El precio debe ser mayor a 0'
		}

		// Validar descripción (mínimo 10 caracteres)
		if (!formData.description.trim() || formData.description.trim().length < 10) {
			newErrors.description = 'La descripción debe tener al menos 10 caracteres'
		}

		// Validar stock
		const stock = parseInt(formData.stock)
		if (!formData.stock || isNaN(stock) || stock < 0) {
			newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0'
		}

		// Validar imagen (URL básica)
		if (!formData.image.trim()) {
			newErrors.image = 'La URL de la imagen es obligatoria'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		const productData = {
			name: formData.name.trim(),
			price: parseFloat(formData.price),
			description: formData.description.trim(),
			category: formData.category,
			image: formData.image.trim(),
			stock: parseInt(formData.stock),
			featured: formData.featured,
		}

		try {
			await onSubmit(productData)
		} catch (error) {
			// Error handling is done in the context
		}
	}

	const handleInputChange = (field: keyof FormData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
		// Clear error when user starts typing
		if (errors[field as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }))
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='space-y-2'>
				<Label htmlFor='name'>Nombre del Producto *</Label>
				<Input
					id='name'
					value={formData.name}
					onChange={(e) => handleInputChange('name', e.target.value)}
					placeholder='Ej: Vela de Lavanda'
					className={errors.name ? 'border-red-500' : ''}
				/>
				{errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='price'>Precio *</Label>
				<Input
					id='price'
					type='number'
					step='0.01'
					min='0'
					value={formData.price}
					onChange={(e) => handleInputChange('price', e.target.value)}
					placeholder='0.00'
					className={errors.price ? 'border-red-500' : ''}
				/>
				{errors.price && <p className='text-sm text-red-500'>{errors.price}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='description'>Descripción *</Label>
				<Textarea
					id='description'
					value={formData.description}
					onChange={(e) => handleInputChange('description', e.target.value)}
					placeholder='Describe el producto (mínimo 10 caracteres)'
					rows={4}
					className={errors.description ? 'border-red-500' : ''}
				/>
				{errors.description && <p className='text-sm text-red-500'>{errors.description}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='category'>Categoría</Label>
				<Select
					value={formData.category}
					onValueChange={(value: 'velas' | 'inciensos' | 'cristales' | 'accesorios') =>
						handleInputChange('category', value)
					}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='velas'>Velas</SelectItem>
						<SelectItem value='inciensos'>Inciensos</SelectItem>
						<SelectItem value='cristales'>Cristales</SelectItem>
						<SelectItem value='accesorios'>Accesorios</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='image'>URL de la Imagen *</Label>
				<Input
					id='image'
					value={formData.image}
					onChange={(e) => handleInputChange('image', e.target.value)}
					placeholder='https://ejemplo.com/imagen.jpg'
					className={errors.image ? 'border-red-500' : ''}
				/>
				{errors.image && <p className='text-sm text-red-500'>{errors.image}</p>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='stock'>Stock *</Label>
				<Input
					id='stock'
					type='number'
					min='0'
					value={formData.stock}
					onChange={(e) => handleInputChange('stock', e.target.value)}
					placeholder='0'
					className={errors.stock ? 'border-red-500' : ''}
				/>
				{errors.stock && <p className='text-sm text-red-500'>{errors.stock}</p>}
			</div>

			<div className='flex items-center space-x-2'>
				<input
					type='checkbox'
					id='featured'
					checked={formData.featured}
					onChange={(e) => handleInputChange('featured', e.target.checked)}
					className='rounded'
				/>
				<Label htmlFor='featured'>Producto Destacado</Label>
			</div>

			<div className='flex space-x-4 pt-4'>
				<Button
					type='submit'
					disabled={isLoading}
					className='bg-mystic-beige hover:bg-mystic-gold text-gray-800'
				>
					{isLoading ? 'Guardando...' : product ? 'Actualizar' : 'Crear Producto'}
				</Button>
				<Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}

export default ProductForm
