import clsx from 'clsx';

interface Props {
  large?: boolean;
  color?: 'dark' | 'white';
  orientation?: 'default' | 'top' | 'left';
}

const Arrow = ({ large, color = 'dark', orientation = 'default' }: Props) => (
  <div
    className={clsx('arrow', {
      'arrow--large': large,
      [`arrow--color-${color}`]: color,
      [`arrow--orientation-${orientation}`]: orientation,
    })}
  />
);

export default Arrow;
