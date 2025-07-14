import React from 'react'
import SearchBar from './SearchBar'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'

interface ProductsFiltersProps {
	searchTerm: string
	selectedCategory: string
	totalResults: number
	paginatedProductsLength: number
	onSearchChange: (term: string) => void
	onCategoryChange: (category: string) => void
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
	searchTerm,
	selectedCategory,
	totalResults,
	paginatedProductsLength,
	onSearchChange,
	onCategoryChange,
}) => {
	const categories = [
		{ value: '', label: 'Todas las categorías' },
		{ value: 'velas', label: 'Velas Artesanales' },
		{ value: 'inciensos', label: 'Inciensos Sagrados' },
		{ value: 'cristales', label: 'Cristales Mágicos' },
		{ value: 'accesorios', label: 'Accesorios Místicos' },
	]

	console.log('ProductsFilters: Current state', { searchTerm, selectedCategory, totalResults })

	return (
		<div className='bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg border border-mystic-lavender/20'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
				<SearchBar
					searchTerm={searchTerm}
					onSearchChange={onSearchChange}
					placeholder='Buscar por nombre, descripción o categoría...'
					className='w-full'
				/>

				<div className='relative' role='combobox' aria-label='Filtrar por categoría'>
					<Filter
						className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4'
						aria-hidden='true'
					/>
					<select
						value={selectedCategory}
						onChange={(e) => {
							console.log('ProductsFilters: Category select changed to:', e.target.value)
							onCategoryChange(e.target.value)
						}}
						className='w-full pl-10 pr-4 py-2 border border-mystic-lavender/30 rounded-md font-montserrat focus:border-mystic-gold focus:ring-mystic-gold/20 bg-white'
						aria-label='Filtrar productos por categoría'
					>
						{categories.map((category) => (
							<option key={category.value} value={category.value}>
								{category.label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className='flex justify-between items-center text-sm text-gray-600 font-montserrat'>
				<span aria-live='polite' aria-atomic='true'>
					{totalResults === 0
						? 'No se encontraron productos'
						: `Mostrando ${paginatedProductsLength} de ${totalResults} productos`}
				</span>
				{searchTerm && <span className='text-mystic-gold'>Resultados para: "{searchTerm}"</span>}
			</div>
		</div>
	)
}

export default ProductsFilters
