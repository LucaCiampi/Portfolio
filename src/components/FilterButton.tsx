import React from 'react';
import Button from '@/components/Button';
import CheckMark from 'public/images/checkmark.svg';
import clsx from 'clsx';

interface Props {
  techno: string;
  isActive: boolean;
  onClick: (techno: string) => void;
}

const FilterButton: React.FC<Props> = React.memo(
  ({ techno, isActive, onClick }) => (
    <Button
      className={clsx(
        'flex gap-2 border-green text-text items-center',
        isActive && 'bg-green !text-white'
      )}
      title={techno}
      onClick={() => onClick(techno)}
    >
      <div className="relative">
        <div
          className={clsx(
            'h-[14px] w-[14px] border-[1px] border-text rotate-45',
            isActive && 'border-white'
          )}
        ></div>
        {isActive && (
          <CheckMark className="absolute -top-[2px] -left-[2px] draw-animation" />
        )}
      </div>
      <div className="w-max">{techno}</div>
    </Button>
  )
);

FilterButton.displayName = 'FilterButton';

export default FilterButton;
