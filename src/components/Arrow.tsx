interface Props {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

const Arrow = () => <div className="arrow" />;

export default Arrow;
