interface Props {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

// TODO: pass onClick events
const Button = ({ children, className, onClick }: Props) => (
    <button onClick={onClick} className={`rounded-full bg-emerald-500 px-3 py-1 ${className || ''}`} title={children?.toString()}>
        {children}
    </button>
)

export default Button