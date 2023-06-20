import projectsData from 'json/projects.json';
import PageWrapper from '@/app/page-wrapper';
import LinkButton from '@/components/LinkButton';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import Section from '@/components/Section';

interface Project {
  slug: string;
  title: string;
  technos: string[];
  content: string;
  url?: string;
}

const educationsIndex: Record<string, Project> = projectsData.reduce((index: Record<string, Project>, project) => {
  index[project.slug] = project;
  return index;
}, {});

interface PageProps {
  params: { slug: string };
}

export default function Page({ params }: PageProps) {
  const project: Project | undefined = educationsIndex[params.slug];

  if (!project) {
    return <div>Projet introuvable</div>;
  }

  return (
    <PageWrapper>
      <article>
        <h1>{project.title}</h1>
        <Section title='Technos'>
          {project.technos.map((techno: string) => (
            <div key={techno}>{techno}</div>
          ))}
        </Section>
        <div>{project.content}</div>
        {project.url && (
          <ExternalLinkButton href={project.url}>Go to site</ExternalLinkButton>
        )}
      </article>
      <LinkButton href={'/projects'}>Back to projects</LinkButton>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return projectsData.map((post: Project) => ({
    slug: post.slug,
  }));
}