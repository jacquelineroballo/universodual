import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
	title?: string
	description?: string
	keywords?: string
	image?: string
	url?: string
	type?: string
}

const SEO: React.FC<SEOProps> = ({
	title = 'Universo Dual - Tienda Esotérica',
	description = 'Tienda esotérica especializada en velas artesanales, inciensos y productos mágicos para elevar tu energía espiritual',
	keywords = 'velas artesanales, inciensos, cristales, productos esotéricos, tienda mística, energía espiritual',
	image = 'https://universodual.vercel.app/estrella.png',
	url = 'https://universodual.vercel.app/',
	type = 'website',
}) => {
	const fullTitle = title.includes('Universo Dual') ? title : `${title} | Universo Dual`

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
			<meta property='og:url' content={url} />
			<meta property='og:site_name' content='Universo Dual' />

			{/* Twitter Card */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={image} />

			{/* Additional SEO */}
			<meta name='robots' content='index, follow' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<link rel='canonical' href={url} />
		</Helmet>
	)
}

export default SEO
