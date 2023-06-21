import ExternalLink from "./ExternalLink"
import Github from "public/images/social/github.svg"
import Linkedin from "../../public/images/social/linkedin.svg"
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
    let icon = <></>

    switch (lowercaseName) {
        case 'github':
            icon = <Github />
            break;
        case 'linkedin':
            icon = <Linkedin />
            break;
        default:
            icon = <></>
            break;
    }

    return (
        <ExternalLink href={href} className={className || ''}>
            {icon}
            <span title={properName}>{properName}</span>
        </ExternalLink>
    )
}

export default ExternalLinkSocial