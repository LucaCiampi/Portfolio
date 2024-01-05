import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  title?: string;
  id?: string;
  backgroundImage?: string;
  fullscreen?: boolean;
  noRow?: boolean;
}

const Section = forwardRef<HTMLElement, Props>(
  (
    {
      children,
      className,
      title,
      id,
      backgroundImage,
      fullscreen,
      noRow,
      ...rest
    },
    ref
  ) => {
    if (title && !id) {
      id = title
        .replaceAll(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    let classNames = "section";
    if (!fullscreen) {
      classNames += " xl:container mx-auto";
    }
    if (className) {
      classNames += " " + className;
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
        <div className={noRow ? "" : "row"}>
          {title && <h2 className="h2">{title}</h2>}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
