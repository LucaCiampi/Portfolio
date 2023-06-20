import React from 'react';
import projectsData from 'json/projects.json';
import PageWrapper from '@/app/page-wrapper';
import LinkButton from '@/components/LinkButton';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import Section from '@/components/Section';
import { Metadata, ResolvingMetadata } from 'next'
 
export async function generateMetadata(
  { params }: PageProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: params.title,
    openGraph: {
      images: [`/projects/${params.slug}/${params.thumbnail}`, ...previousImages],
    },
  }
}

interface Project {
  slug: string;
  title: string;
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

interface PageProps {
  params: { slug: string, title: string, thumbnail: string };
}

const educationsIndex: Record<string, Project> = projectsData.reduce(
  (index: Record<string, Project>, project: Project) => {
    index[project.slug] = project;
    return index;
  },
  {}
);

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
        {project.company &&
          <div>Working for : {project.company}</div>
        }
        {project.url && (
          <ExternalLinkButton href={project.url}>Go to site</ExternalLinkButton>
        )}
        {project.media && project.media.length > 0 && (
          <Section title='Media'>
            {project.media.map((media, index) => {
              const mediaUrl = media.url.startsWith('http')
                ? media.url
                : `/images/projects/${project.slug}/${media.url}`;

              if (media.type === 'video') {
                return (
                  <div key={index}>
                    <video controls>
                      <source src={mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {media.credits && <span>{media.credits}</span>}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <img src={mediaUrl} alt="Preview" />
                    {media.credits && <span>{media.credits}</span>}
                  </div>
                );
              }
            })}
          </Section>
        )}
      </article>
      <LinkButton href={'/projects'}>Back to projects</LinkButton>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return projectsData.map((post: Project) => ({
    slug: post.slug,
    title: post.title,
    thumbnail: post.thumbnail,
  }));
}