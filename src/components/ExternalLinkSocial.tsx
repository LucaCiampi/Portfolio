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

const ExternalLinkSocial = ({ name, href, className }: Props) => {
    const properName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const lowercaseName = name.toLowerCase();
    const svgPath = `/images/social/${lowercaseName}.svg`;

    return (
        <ExternalLink href={href} className={className || ''}>
            <object type="image/svg+xml" data={svgPath}>
                <span>Votre navigateur ne prend pas en charge les SVG.</span>
            </object>
        </ExternalLink>
    )
}

export default ExternalLinkSocial