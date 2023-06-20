import React from 'react';
import projectsData from 'json/projects.json';
import PageWrapper from '@/app/page-wrapper';
import LinkButton from '@/components/LinkButton';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import Section from '@/components/Section';
import { Metadata, ResolvingMetadata } from 'next';

interface Project {
  slug: string;
  title: string;
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

interface PageProps {
  params: { slug: string; title: string; thumbnail: string };
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

  const { title, technos, content, company, url, media } = project;

  const renderMedia = (media: Media[]) => {
    return (
      <Section title="Media">
        {media.map((item, index) => {
          const mediaUrl = item.url.startsWith('http')
            ? item.url
            : `/images/projects / ${params.slug}/${item.url}`;
          return (
            <div key={index}>
              {item.type === 'video' ? (
                <div>
                  <video controls>
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {item.credits && <span>{item.credits}</span>}
                </div>
              ) : (
                <div>
                  <img src={mediaUrl} alt="Preview" />
                  {item.credits && <span>{item.credits}</span>}
                </div>
              )}
            </div>
          );
        })}
      </Section>
    );
  };

  return (
    <PageWrapper>
      <article>
        <h1>{title}</h1>
        <Section title="Technos">
          {technos.map((techno: string, index: number) => (
            <div key={index}>{techno}</div>
          ))}
        </Section>
        <div>{content}</div>
        {company && <div>Working for: {company}</div>}
        {url && <ExternalLinkButton href={url}>Go to site</ExternalLinkButton>}
        {media && media.length > 0 && renderMedia(media)}
      </article>
      <LinkButton href="/projects">Back to projects</LinkButton>
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

export async function generateMetadata(
  { params }: PageProps,
  parent?: Promise<ResolvingMetadata>
): Promise<Metadata> {
  const { title, slug, thumbnail } = params;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title || '',
    openGraph: {
      images: [`/projects/${slug} / ${thumbnail}`, ...previousImages],
    },
  };
}