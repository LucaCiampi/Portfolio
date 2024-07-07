const BookSection = () => (
  <div className="flex wrap gap-12 py-12">
    <div className="min-w-80 flex-grow aspect-[16/9]">
      <embed
        src="/book.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
    <div className="flex-grow">
      <div>Download</div>
      <div>See in new window</div>
    </div>
  </div>
);

export default BookSection;
