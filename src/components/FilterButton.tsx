import React from "react";
import Button from "@/components/Button";
import Image from "next/image";
import CheckMarkContour from "public/images/checkmark-contour.svg";
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
        <CheckMarkContour />
        {activeFilters.includes(techno) ? (
          <CheckMark className="absolute top-0 left-1" />
        ) : (
          <></>
        )}
      </div>
      {techno}
    </Button>
  )
);

FilterButton.displayName = "FilterButton";

export default FilterButton;