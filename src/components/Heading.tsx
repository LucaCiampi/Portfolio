import React from 'react';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const Heading = ({ level = 'p', children, className }: Props) => {
  const HeadingTag = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(level, props, children);

  return <HeadingTag className={className}>{children}</HeadingTag>;
};

export default Heading;
