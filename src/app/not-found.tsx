import LinkButton from '@/components/LinkButton';

export default function NotFoundPage() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <p className="mb-2">This page could not be found</p>
      <LinkButton className="bg-black text-background" href={'/'}>
        Return to homepage
      </LinkButton>
    </div>
  );
}
