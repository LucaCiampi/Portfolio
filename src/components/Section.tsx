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
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }

    let classNames = "";
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
          <div className="overflow-x-hidden w-full">
            <div
              className={`relative xl:container mx-auto z-20 text-brown ${
                isTitleRight ? "text-right" : ""
              }`}
            >
              <h2 className="text-[96px] font-playfair-display">{title}</h2>
              <div
                className={`absolute top-2/3 right-full border-dotted w-full border-b-2 border-text ${
                  isTitleRight ? "left-full" : "right-full"
                }`}
              ></div>
            </div>
          </div>
        )}
        <div className={fullscreen ? "" : "xl:container mx-auto"}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
