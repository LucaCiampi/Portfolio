import Button from "./Button";
import ExternalLink from "./ExternalLink";

interface Props {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

const ExternalLinkButton = ({ children, href, className }: Props) => (
  <ExternalLink href={href}>
    <Button className={`button--elink ${className || ""}`}>{children}</Button>
  </ExternalLink>
);

export default ExternalLinkButton;
