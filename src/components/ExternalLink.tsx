import Link from "next/link";
import { Url } from "url";

interface Props {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

const ExternalLink = ({ children, href, className }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {children}
  </a>
);

export default ExternalLink;
