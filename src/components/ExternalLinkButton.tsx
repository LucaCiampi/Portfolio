import Button from './Button';
import ExternalLink from './ExternalLink';

interface Props {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

const ExternalLinkButton = ({ children, href, className }: Props) => (
  <ExternalLink href={href} className="inline-block w-fit">
    <Button className={className || ''}>{children}</Button>
  </ExternalLink>
);

export default ExternalLinkButton;
