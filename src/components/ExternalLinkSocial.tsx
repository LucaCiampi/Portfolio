import ExternalLink from "./ExternalLink"
import Image from "next/image"

interface Props {
    name: string,
    href: string,
    className?: string,
    outline?: boolean,
    white?: boolean,
    size?: number,
}

const ExternalLinkSocial = ({ name, href, className, outline, white, size }: Props) => {
    const properName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const lowercaseName = name.toLowerCase();

    return (
        <ExternalLink href={href} className={className || ''}>
            <Image 
            width={size || "40"} 
            height={size || "40"} 
            src={`/images/social/` + lowercaseName + `${outline ? '-outline' : ''}.svg`}
            className={white ? 'fill--white' : ''}
            alt={properName} 
            title={properName} />
        </ExternalLink>
    )
}

export default ExternalLinkSocial