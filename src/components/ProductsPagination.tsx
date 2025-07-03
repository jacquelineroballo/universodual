import React from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination'

interface ProductsPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) return null

	return (
		<div className='flex justify-center' role='navigation' aria-label='Paginación de productos'>
			<Pagination className='mb-8'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
							className={
								currentPage === 1
									? 'pointer-events-none opacity-50'
									: 'cursor-pointer hover:bg-mystic-lavender/20'
							}
							aria-disabled={currentPage === 1}
						/>
					</PaginationItem>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								onClick={() => onPageChange(page)}
								isActive={currentPage === page}
								className='cursor-pointer hover:bg-mystic-lavender/20 data-[active]:bg-mystic-gold data-[active]:text-gray-800'
								aria-label={`Ir a la página ${page}`}
								aria-current={currentPage === page ? 'page' : undefined}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
							className={
								currentPage === totalPages
									? 'pointer-events-none opacity-50'
									: 'cursor-pointer hover:bg-mystic-lavender/20'
							}
							aria-disabled={currentPage === totalPages}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}

export default ProductsPagination
