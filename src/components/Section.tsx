import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import SectionTitle from './SectionTitle';

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
        <div className={fullscreen ? '' : 'xl:container mx-auto px-6 md:px-0'}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';
export default Section;
