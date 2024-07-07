import clsx from 'clsx';

interface Props {
  children?: React.ReactNode;
  className?: string;
  fullscreen?: boolean;
}

const Container = ({ children, className, fullscreen }: Props) => (
  <div
    className={clsx(
      !fullscreen && 'xl:container mx-auto px-6 xl:px-0',
      className
    )}
  >
    {children}
  </div>
);

export default Container;
