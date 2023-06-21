import ExternalLink from "./ExternalLink"
import Github from "public/images/social/github.svg"
import Linkedin from "public/images/social/linkedin.svg"
import Image from "next/image"

interface Props {
    name: string,
    href: string,
    className?: string,
}

const ExternalLinkSocial = ({ name, href, className }: Props) => {
    const properName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const IconComponent = name === "github" ? Github : name === "linkedin" ? Linkedin : null;

    return (
        <ExternalLink href={href} className={className || ''}>
            {IconComponent && <IconComponent />}
            <span title={properName}>{properName}</span>
        </ExternalLink>
    )
}

export default ExternalLinkSocial