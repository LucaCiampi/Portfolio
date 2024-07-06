interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className, onClick }: Props) => (
  <button
    onClick={onClick}
    className={`rounded-full border-olive px-3 ${className || ""}`}
    title={children?.toString()}
  >
    {children}
  </button>
);

export default Button;
