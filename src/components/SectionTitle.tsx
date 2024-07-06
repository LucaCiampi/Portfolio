interface Props {
  title: string;
  isTitleRight?: boolean;
}

const SectionTitle = ({ title, isTitleRight }: Props) => {
  return (
    <div className="overflow-x-clip relative w-full">
      <div
        className={`relative xl:container mx-auto z-20 text-brown ${
          isTitleRight ? 'text-right' : ''
        }`}
      >
        <h2 className="2xl:text-[96px] text-2xl mb-14 font-playfair-display">
          {title}
        </h2>
        <div
          className={`absolute top-1/2 translate-y-1 -translate-x-4 right-full border-dotted w-full border-b-2 border-text ${
            isTitleRight ? 'left-full' : 'right-full'
          }`}
        />
      </div>
      <div className="absolute left-0 w-full h-12 md:h-24 translate-y-1 md:translate-y-4 top-1/2 bg-grey"></div>
    </div>
  );
};
export default SectionTitle;
