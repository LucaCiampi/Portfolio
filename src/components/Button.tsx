interface Props {
    children?: React.ReactNode,
    className?: string,
}

const Button = ({ children, className }: Props) => (
    <button className={`button ${className}`} title={children?.toString()}>
        {children}
    </button>
)

export default Button