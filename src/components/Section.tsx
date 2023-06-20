interface Props {
	children?: React.ReactNode,
	className?: string,
	title?: string,
	divider?: boolean,
	id?: string,
	backgroundImage?: string,
	fullscreen?: boolean,
	innerPadding?: boolean,
	noRow?: boolean,
}

// TODO: rework conditional classnames
const Section = ({ children, className, title, divider, id, backgroundImage, fullscreen, innerPadding, noRow }: Props) => {

	if (title && !id) id = title.replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")

	// classNames
	let classNames = 'section'
	if (fullscreen) classNames += ' fullscreen'
	if (innerPadding) classNames += ' innerpadding'
	if (className) classNames += ' ' + className

	if (fullscreen) {
		<section
			className={classNames}
			{...(id ? { id: id } : {})}
			{...(backgroundImage ? { style: { backgroundImage: `url(/images/${backgroundImage})` } } : {})}
		>
			{children}
		</section>
	}

	return (
		<section
			className={classNames}
			{...(id ? { id: id } : {})}
			{...(backgroundImage ? { style: { backgroundImage: `url(/images/${backgroundImage})` } } : {})}
		>
			<div className={noRow ? "" : 'row'}>
				{title && <h2 className="h2">{title}</h2>}
				{divider && <hr />}
				<div className="pt-4 tab:pt-0">
					{children}
				</div>
			</div>
		</section>
	)
}

export default Section