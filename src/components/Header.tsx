"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import React from 'react'
import { LayoutGroup } from 'framer-motion'

import NoScrollLink from '@/components/NoScrollLink'
import DarkModeToggle from '@/components/DarkModeToggle';

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

const Header = () => {
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
		<header className='fixed z-30 right-0'>
			<div className='flex'>
				<LayoutGroup>
					<nav>
						<ul className='flex'>
							{links.map(({ label, href, classes, submenu }) => (
								<li key={label} className={`${classes || ''}`}>
									<NoScrollLink href={href}>
										<span title={label} onClick={handleMenuLinkClick}>
											<span>{label}</span>
										</span>
									</NoScrollLink>
									{submenu && (
										<ul className='flex flex-col'>
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
					<DarkModeToggle />
				</LayoutGroup>
				<div className="block xl:hidden" onClick={handleNaviconClick}>
					<span>nav icon here</span>
				</div>
			</div>
		</header>
	);
};

export default Header;