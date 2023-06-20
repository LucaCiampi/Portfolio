import Link from "next/link"
import Button from "./Button"

interface Props {
    children?: React.ReactNode,
    href: string,
    className?: string,
}

const LinkButton = ({ children, href, className }: Props) => (
    <Link href={href}>
        <span>
            <Button className={`button--link ${className}`}>
                {children}
            </Button>
        </span>
    </Link>
)

export default LinkButton