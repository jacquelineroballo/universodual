import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Upload, X, Image } from 'lucide-react'

interface ImageUploadProps {
	value: string
	onChange: (value: string) => void
	error?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, error }) => {
	const [preview, setPreview] = useState<string>(value || '')
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setPreview(value || '')
	}, [value])

	const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith('image/')) {
			alert('Por favor selecciona una imagen válida')
			return
		}

		if (file.size > 5 * 1024 * 1024) {
			alert('La imagen debe ser menor a 5MB')
			return
		}

		setIsUploading(true)

		try {
			const reader = new FileReader()
			reader.onload = (e) => {
				const result = e.target?.result as string
				setPreview(result)
				onChange(result)
				setIsUploading(false)
			}
			reader.onerror = () => {
				console.error('Error reading file')
				alert('Error al leer la imagen')
				setIsUploading(false)
			}
			reader.readAsDataURL(file)
		} catch (error) {
			console.error('Error uploading image:', error)
			alert('Error al subir la imagen')
			setIsUploading(false)
		}
	}

	const handleRemoveImage = () => {
		setPreview('')
		onChange('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleUrlChange = (url: string) => {
		setPreview(url)
		onChange(url)
	}

	return (
		<div className='space-y-4'>
			<Label>Imagen del Producto *</Label>

			<div className='border-2 border-dashed border-gray-300 rounded-lg p-6'>
				{preview ? (
					<div className='relative'>
						<img
							src={preview}
							alt='Preview'
							className='w-full h-48 object-cover rounded-lg'
							onError={(e) => {
								const target = e.target as HTMLImageElement
								target.src = '/placeholder.svg'
							}}
						/>
						<Button
							type='button'
							variant='destructive'
							size='sm'
							className='absolute top-2 right-2'
							onClick={handleRemoveImage}
						>
							<X className='w-4 h-4' />
						</Button>
					</div>
				) : (
					<div className='text-center'>
						<Image className='w-12 h-12 mx-auto text-gray-400 mb-4' />
						<p className='text-gray-500 mb-4'>Sube una imagen o ingresa una URL</p>
					</div>
				)}

				<div className='space-y-4 mt-4'>
					<div>
						<Button
							type='button'
							variant='outline'
							onClick={() => fileInputRef.current?.click()}
							disabled={isUploading}
							className='w-full'
						>
							<Upload className='w-4 h-4 mr-2' />
							{isUploading ? 'Subiendo...' : 'Subir Imagen'}
						</Button>
						<input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							onChange={handleFileSelect}
							className='hidden'
						/>
					</div>

					<div className='text-center text-gray-400'>o</div>

					<div>
						<Input
							placeholder='https://ejemplo.com/imagen.jpg'
							value={preview.startsWith('data:') ? '' : preview}
							onChange={(e) => handleUrlChange(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{error && <p className='text-sm text-red-500'>{error}</p>}
		</div>
	)
}

export default ImageUpload
