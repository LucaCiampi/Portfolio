import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

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
        .replaceAll(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    let classNames = "relative";
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
        {title && (
          <div className="relative">
            <div
              className={`absolute top-1/2 px-4 ${
                isTitleRight ? "left-full" : "right-full"
              }`}
            >
              ........................
            </div>
            <h2
              className={`text-brown text-[96px] font-playfair-display ${
                isTitleRight ? "ml-auto" : ""
              }`}
            >
              {title}
            </h2>
          </div>
        )}
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
