import Link from 'next/link';
import Button from './Button';
import clsx from 'clsx';

interface Props {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

const LinkButton = ({ children, href, className }: Props) => (
  <Link href={href} className="inline-block">
    <span>
      <Button className={clsx('button--link', className)}>{children}</Button>
    </span>
  </Link>
);

export default LinkButton;
