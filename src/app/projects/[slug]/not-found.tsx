import LinkButton from '@/components/LinkButton';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        <LinkButton href="/projects">Back to projects</LinkButton>
      </p>
    </div>
  );
}
