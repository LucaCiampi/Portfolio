interface Props {
  large?: boolean;
}

const Arrow = ({ large }: Props) => (
  <div className={`arrow ${large && 'arrow--large'}`} />
);

export default Arrow;
