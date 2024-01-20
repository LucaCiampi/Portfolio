import React from "react";
import Button from "@/components/Button";
import Image from "next/image";
import CheckMark from "public/images/checkmark.svg";

interface Props {
  techno: string;
  activeFilters: string[];
  onClick: (techno: string) => void;
}

const FilterButton: React.FC<Props> = React.memo(
  ({ techno, activeFilters, onClick }) => (
    <Button
      className={`flex gap-2 items-center ${
        activeFilters.includes(techno) ? "bg-marine" : ""
      }`}
      onClick={() => onClick(techno)}
    >
      <div className="relative">
        <Image
          src="/images/checkmark-contour.svg"
          width={16}
          height={16}
          alt="Checkmark contour"
        />
        {activeFilters.includes(techno) && (
          <CheckMark className="absolute -top-[1px] -left-[1px] draw-animation" />
        )}
      </div>
      {techno}
    </Button>
  )
);

FilterButton.displayName = "FilterButton";

export default FilterButton;
