import React from "react";

export enum BorderStyles {
  solid = "solid",
  double = "double",
}

interface Props {
  children?: React.ReactNode;
  className?: string;
  borderStyle: BorderStyles;
  onClick?: () => void;
}

const Frame = ({ children, className, borderStyle, onClick }: Props) => {
  switch (borderStyle) {
    case BorderStyles.solid:
      return (
        <div
          onClick={onClick}
          className={`border-4 border-grey inline-block ${className || ""}`}
        >
          {children}
        </div>
      );

    case BorderStyles.double:
      return (
        <div
          onClick={onClick}
          className={`relative inline-block ${className || ""}`}
        >
          <div className="absolute -left-2 -top-2 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-outline"></div>
          <div className="absolute -left-0 -top-0 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-outline"></div>
          {children}
        </div>
      );

    default:
      return null;
  }
};

export default Frame;
