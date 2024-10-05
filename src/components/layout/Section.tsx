import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Container from '@/components/layout/Container';
import clsx from 'clsx';
import slugify from '@/utils/slugify';

interface Props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  title?: string;
  isTitleRight?: boolean;
  id?: string;
  backgroundImage?: string;
  fullscreen?: boolean;
}

const Section = forwardRef<HTMLElement, Props>(
  (
    {
      children,
      className,
      title,
      isTitleRight,
      id,
      backgroundImage,
      fullscreen,
      ...rest
    },
    ref
  ) => {
    if (title && !id) {
      id = slugify(title);
    }

    const classNames = clsx(className);

    const sectionProps = {
      className: classNames,
      ...(id && { id }),
      ...(backgroundImage && {
        style: { backgroundImage: `url(/images/${backgroundImage})` },
      }),
      ...(title && { 'data-sectiontitle': title }),
      ...rest,
    };

    return (
      <section ref={ref} {...sectionProps}>
        {title && <SectionTitle title={title} isTitleRight={isTitleRight} />}
        <Container fullscreen={fullscreen}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = 'Section';
export default Section;
