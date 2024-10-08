import Container from '@/components/layout/Container';
import clsx from 'clsx';

interface Props {
  title: string;
  isTitleRight?: boolean;
}

const SectionTitle = ({ title, isTitleRight }: Props) => {
  return (
    <div className="overflow-x-clip relative w-full mb-14">
      <Container
        className={clsx(
          'relative z-20 text-brown',
          isTitleRight && 'text-right'
        )}
      >
        <h2 className="lg:text-[96px] lg:leading-[100px] text-5xl font-playfair-display inline-block">
          {title}
        </h2>
        <div
          className={clsx(
            'absolute top-1/2 translate-y-1 -translate-x-4 right-full border-dotted w-full border-b-2 border-text',
            { 'left-full': isTitleRight, 'right-full': !isTitleRight }
          )}
        />
      </Container>
      <div className="absolute left-0 w-full h-12 md:h-24 translate-y-1 md:translate-y-4 top-1/2 bg-grey"></div>
    </div>
  );
};
export default SectionTitle;
