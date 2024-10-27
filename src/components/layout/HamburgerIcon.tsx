import clsx from 'clsx';

interface Props {
  onClick?: () => void;
  isOpen?: boolean;
}

const HamburgerIcon = ({ onClick, isOpen }: Props) => {
  return (
    <button
      onClick={onClick}
      title="Menu"
      aria-label="Menu"
      className="z-10 rounded-full relative px-3 h-12 w-12 flex flex-col gap-2 justify-center items-center pointer-events-auto"
    >
      <span
        className={clsx(
          'h-[1px] bg-white transition-all rounded-full w-full',
          isOpen && 'translate-y-1'
        )}
      />
      <span
        className={clsx(
          'h-[1px] bg-white transition-all rounded-full w-full',
          isOpen && '-translate-y-1'
        )}
      />
    </button>
  );
};

export default HamburgerIcon;
