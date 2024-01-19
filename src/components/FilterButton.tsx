import React from "react";
import Button from "@/components/Button";

interface Props {
  techno: string;
  activeFilters: string[];
  onClick: (techno: string) => void;
}

const FilterButton: React.FC<Props> = React.memo(
  ({ techno, activeFilters, onClick }) => (
    <Button
      className={`mr-3 ${
        activeFilters.includes(techno) ? "olive text-white" : ""
      }`}
      onClick={() => onClick(techno)}
    >
      {techno}
    </Button>
  )
);

FilterButton.displayName = "FilterButton";

export default FilterButton;
