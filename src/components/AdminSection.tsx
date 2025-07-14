import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { LucideIcon } from 'lucide-react'

interface AdminSectionProps {
	title: string
	description: string
	icon: LucideIcon
	link?: string
	stats?: Array<{ label: string; value: string | number; highlight?: boolean }>
	badge?: { text: string; count: number }
	note?: string
}

const AdminSection: React.FC<AdminSectionProps> = ({
	title,
	description,
	icon: Icon,
	link,
	stats = [],
	badge,
	note,
}) => {
	const CardComponent = ({ children }: { children: React.ReactNode }) => {
		if (link) {
			return (
				<Link to={link}>
					<Card className='hover:shadow-lg transition-shadow cursor-pointer'>{children}</Card>
				</Link>
			)
		}

		return <Card className='hover:shadow-lg transition-shadow'>{children}</Card>
	}

	return (
		<CardComponent>
			<CardHeader>
				<CardTitle className='flex items-center gap-3'>
					<Icon className='w-6 h-6 text-mystic-gold' />
					{title}
					{badge && badge.count > 0 && (
						<span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
							{badge.count}
						</span>
					)}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-2'>
					{stats.map((stat, index) => (
						<div key={index} className='flex justify-between text-sm'>
							<span>{stat.label}:</span>
							<span className={`font-semibold ${stat.highlight ? 'text-red-600' : ''}`}>
								{stat.value}
							</span>
						</div>
					))}
					{note && <div className='text-xs text-gray-500'>{note}</div>}
				</div>
			</CardContent>
		</CardComponent>
	)
}

export default AdminSection
