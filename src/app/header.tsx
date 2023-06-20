"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import React from 'react'
import { LayoutGroup, motion } from 'framer-motion'

import NoScrollLink from './no-scroll-link'

interface Link {
	label: string,
	href: string,
	classes?: string,
	submenu?: Link[],
}

const links: Link[] = [
	{ label: "HOME", href: '/' },
	{ label: "PROJECTS", href: '/projects' },
	{ label: "CONTACT", href: '/contact' },
]

const revealingHeaderScrollThreshold = 100

interface Props {
	fixed?: boolean,
	revealOnScroll?: boolean,
	tabletRevealOnScroll?: boolean,
	className?: string,
	id?: string,
}

const Header = ({ fixed = false, revealOnScroll, tabletRevealOnScroll, className, id }: Props) => {
	const [mobilenavToggled, setMobilenavToggled] = useState(false);
	const [revealingHeader, setRevealingHeader] = useState(false);

	const handleNaviconClick = () => { setMobilenavToggled(current => !current); };
	const handleScroll = () => {
		setRevealingHeader(window.scrollY > revealingHeaderScrollThreshold)
	};

	const handleMenuLinkClick = (e: React.MouseEvent<HTMLElement>) => {
		setMobilenavToggled(false)
	};

	useEffect(() => {
		setRevealingHeader(false)
		setMobilenavToggled(false);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header id={id} className=''>
			<div className='flex row v-center space-between'>
				<LayoutGroup>
					<nav>
						<ul className={`flex tablet-flex-column v-center tablet-h-0`}>
							{links.map(({ label, href, classes, submenu }) => (
								<li key={label} className={`${classes ? classes : ''}`}>
									<NoScrollLink href={href}>
										<span title={label} onClick={handleMenuLinkClick}>
											<span>{label}</span>
										</span>
									</NoScrollLink>
									{submenu && (
										<ul className={`flex flex-column txt-black`}>
											{submenu.map(({ label, href }) => (
												<li key={label}>
													<Link href={href}>
														<span title={label}>{label}</span>
													</Link>
												</li>
											))}
										</ul>
									)}
								</li>
							))}
						</ul>
					</nav>
				</LayoutGroup>
				<div className={`desk:d-none`} onClick={handleNaviconClick}>
					<span></span>
				</div>
			</div>
		</header>
	)
}

export default Header