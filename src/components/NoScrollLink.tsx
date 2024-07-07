import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

interface Props extends LinkProps {
  children: ReactNode;
}

const NoScrollLink = ({ children, href, passHref }: Props): JSX.Element => (
  <Link href={href} passHref={passHref} scroll={false}>
    {children}
  </Link>
);

export default NoScrollLink;
