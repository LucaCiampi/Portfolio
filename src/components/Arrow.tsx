interface Props {
  large?: boolean;
  color?: 'dark' | 'white';
  orientation?: 'default' | 'top';
}

const Arrow = ({ large, color = 'dark', orientation = 'default' }: Props) => (
  <div
    className={`arrow ${
      large && 'arrow--large'
    } arrow--color-${color} arrow--orientation-${orientation}`}
  />
);

export default Arrow;
