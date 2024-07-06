import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Container from '@/components/Container';

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
      id = title
        .replaceAll(' ', '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    }

    let classNames = '';
    if (className) {
      classNames += ' ' + className;
    }

    const sectionProps = {
      className: classNames,
      ...(id && { id }),
      ...(backgroundImage && {
        style: { backgroundImage: `url(/images/${backgroundImage})` },
      }),
      ...(title && { sectiontitle: title }),
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
