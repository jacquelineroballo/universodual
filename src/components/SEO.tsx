import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
	title?: string
	description?: string
	keywords?: string
	image?: string
	url?: string
	type?: string
	product?: {
		name: string
		price: number
		category: string
		availability: boolean
	}
}

const SEO: React.FC<SEOProps> = ({
	title = 'Universo Dual - Tienda Esotérica',
	description = 'Tienda esotérica especializada en velas artesanales, inciensos y productos mágicos para elevar tu energía espiritual',
	keywords = 'velas artesanales, inciensos, cristales, productos esotéricos, tienda mística, energía espiritual',
	image = 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	url = 'https://universodual.vercel.app/',
	type = 'website',
	product,
}) => {
	const fullTitle = title.includes('Universo Dual') ? title : `${title} | Universo Dual`
	const canonicalUrl = url

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': product ? 'Product' : 'Organization',
		...(product
			? {
					name: product.name,
					description: description,
					image: image,
					offers: {
						'@type': 'Offer',
						price: product.price,
						priceCurrency: 'USD',
						availability: product.availability
							? 'https://schema.org/InStock'
							: 'https://schema.org/OutOfStock',
					},
					category: product.category,
			  }
			: {
					name: 'Universo Dual',
					description: description,
					url: url,
					logo: image,
					sameAs: ['https://instagram.com/universodual', 'https://facebook.com/universodual'],
			  }),
	}

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
			<meta name='author' content='Universo Dual' />

			{/* Open Graph */}
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={description} />
			<meta property='og:type' content={type} />
			<meta property='og:image' content={image} />
			<meta property='og:url' content={canonicalUrl} />
			<meta property='og:site_name' content='Universo Dual' />
			<meta property='og:locale' content='es_ES' />

			{/* Twitter Card */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={image} />

			{/* Additional SEO */}
			<meta name='robots' content='index, follow' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='theme-color' content='#D4B896' />
			<link rel='canonical' href={canonicalUrl} />

			{/* JSON-LD Structured Data */}
			<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>

			{/* Preconnect to external domains */}
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
		</Helmet>
	)
}

export default SEO
