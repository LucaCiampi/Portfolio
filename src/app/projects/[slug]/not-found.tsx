import LinkButton from '@/components/links/LinkButton';

export default function NotFoundPage() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <p className="mb-2">This project could not be found</p>
      <LinkButton className="bg-black text-background" href={'/#work'}>
        Return to projects
      </LinkButton>
    </div>
  );
}
