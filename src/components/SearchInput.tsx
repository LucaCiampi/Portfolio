import React from "react";
import Image from "next/image";

interface Props {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<Props> = ({ value, placeholder, onChange }) => (
  <label className="flex items-end gap-2">
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="border-b-[1px] border-background bg-transparent focus:outline-none focus:ring-1 focus:ring-yellow focus:border-transparent"
      onChange={onChange}
    />
    <div className="cursor-pointer">
      <Image src="/images/search.svg" width={16} height={16} alt="Search" />
    </div>
  </label>
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
