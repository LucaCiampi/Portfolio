import React from 'react';
import projectsData from 'json/projects.json';
import PageWrapper from '@/app/page-wrapper';
import LinkButton from '@/components/LinkButton';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import Section from '@/components/Section';
import { Metadata, ResolvingMetadata } from 'next';
import NotFound from './not-found';

interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technos: string[];
  content: string;
  company?: string;
  url?: string;
  media?: Media[];
}

interface Media {
  type: string;
  url: string;
  credits?: string;
}

interface Props {
  params: { slug: string };
}

const projectsIndex: Record<string, Project> = projectsData.reduce(
  (index: Record<string, Project>, project: Project) => {
    index[project.slug] = project;
    return index;
  },
  {}
);

export default function Page({ params }: Props) {
  const project = projectsIndex[params.slug];

  if (!project) {
    NotFound();
  }

  const renderTechnos = () => (
    <Section title="Technos">
      {project.technos.map((techno: string) => (
        <div key={techno}>{techno}</div>
      ))}
    </Section>
  );

  const renderMedia = () => (
    <Section title="Media">
      {project.media?.map((media, index) => {
        const mediaUrl = media.url.startsWith('http')
          ? media.url
          : `/images/projects/${project.slug}/${media.url}`;

        return (
          <div key={index}>
            {media.type === 'video' ? (
              <div>
                <video controls>
                  <source src={mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {media.credits && <span>{media.credits}</span>}
              </div>
            ) : (
              <div>
                <img src={mediaUrl} alt="Preview" />
                {media.credits && <span>{media.credits}</span>}
              </div>
            )}
          </div>
        );
      })}
    </Section>
  );

  return (
    <PageWrapper>
      <article>
        <h1>{project.title}</h1>
        {renderTechnos()}
        <div>{project.content}</div>
        {project.company && <div>Working for: {project.company}</div>}
        {project.url && (
          <ExternalLinkButton href={project.url}>Go to site</ExternalLinkButton>
        )}
        {project.media && project.media.length > 0 && renderMedia()}
      </article>
      <LinkButton href="/projects">Back to projects</LinkButton>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return projectsData.map((post: Project) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch data
  const project = projectsIndex[params.slug];

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [`images/projects/${project.slug}/${project.thumbnail}`, ...previousImages],
    },
  };
}