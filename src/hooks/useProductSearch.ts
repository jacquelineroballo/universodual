import { useState, useMemo } from 'react'
import { Product } from '../types/Product'

export const useProductSearch = (products: Product[], itemsPerPage: number = 12) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	const filteredProducts = useMemo(() => {
		if (!products || products.length === 0) return []

		const filtered = products.filter((product) => {
			const matchesSearch =
				searchTerm === '' ||
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(searchTerm.toLowerCase())

			const matchesCategory = selectedCategory === '' || product.category === selectedCategory

			return matchesSearch && matchesCategory
		})

		return filtered
	}, [products, searchTerm, selectedCategory])

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

	const handleSearchChange = (term: string) => {
		setSearchTerm(term)
		setCurrentPage(1)
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
		setCurrentPage(1)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return {
		searchTerm,
		currentPage,
		selectedCategory,
		filteredProducts,
		paginatedProducts,
		totalPages,
		totalResults: filteredProducts.length,
		handleSearchChange,
		handleCategoryChange,
		handlePageChange,
		setCurrentPage,
	}
}
