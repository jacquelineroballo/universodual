import React from 'react'
import { Input } from './ui/input'
import { Search, X } from 'lucide-react'
import { Button } from './ui/button'

interface SearchBarProps {
	searchTerm: string
	onSearchChange: (value: string) => void
	placeholder?: string
	className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchTerm,
	onSearchChange,
	placeholder = 'Buscar productos...',
	className = '',
}) => {
	const handleClear = () => {
		onSearchChange('')
	}

	return (
		<div className={`relative ${className}`} role='search' aria-label='Búsqueda de productos'>
			<div className='relative'>
				<Search
					className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4'
					aria-hidden='true'
				/>
				<Input
					type='text'
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder={placeholder}
					className='pl-10 pr-10 font-montserrat border-mystic-lavender/30 focus:border-mystic-gold focus:ring-mystic-gold/20'
					aria-label={placeholder}
					aria-describedby='search-help'
				/>
				{searchTerm && (
					<Button
						onClick={handleClear}
						variant='ghost'
						size='sm'
						className='absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-mystic-lavender/20'
						aria-label='Limpiar búsqueda'
					>
						<X className='w-4 h-4' />
					</Button>
				)}
			</div>
			<div id='search-help' className='sr-only'>
				Escribe para buscar productos por nombre o categoría
			</div>
		</div>
	)
}

export default SearchBar
