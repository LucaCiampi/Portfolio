import projectsData from 'json/projects.json';
import LinkButton from '@/components/links/LinkButton';
import ExternalLinkButton from '@/components/links/ExternalLinkButton';
import Section from '@/components/layout/Section';
import { Metadata, ResolvingMetadata } from 'next';
import NotFoundPage from './not-found';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Frame, { BorderStyles } from '@/components/projects/Frame';
import Arrow from '@/components/Arrow';

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
    NotFoundPage();
  }

  const renderMedia = () => (
    <Section title="Media" className="my-4">
      {project.media?.map((media, index) => {
        const mediaUrl = media.url.startsWith('http')
          ? media.url
          : `/images/projects/${project.slug}/${media.url}`;

        return (
          <div key={index} className="my-4">
            {media.type === 'video' ? (
              <video controls>
                <source src={mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={mediaUrl}
                alt={project.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            {media.caption && (
              <div className="mt-2 italic">{media.caption}</div>
            )}
          </div>
        );
      })}
    </Section>
  );

  return (
    <article className="pt-24 pb-4">
      <Container>
        <LinkButton
          href="/"
          className="flex items-center gap-2 mb-4 bg-text text-background border-text"
        >
          <Arrow color="white" orientation="left" />
          Go back
        </LinkButton>

        <div className="lg:grid grid-cols-2 gap-8">
          <div className="relative">
            <Frame borderStyle={BorderStyles.solid}>
              <Image
                src={`/images/projects/${project.slug}/${project.thumbnail}`}
                alt={project.title}
                width={16}
                height={9}
              />
            </Frame>
          </div>
          <div>
            <div className="flex justify-between flex-wrap gap-4 py-4">
              <h1 className="lg:text-[96px] lg:leading-[70px] text-6xl font-allison block">
                {project.title}
              </h1>
              <div className="text-xl self-end ml-auto">{project.date}</div>
            </div>
            <hr />
            <div className="flex flex-col gap-4">
              {project.company && <div>Working for : {project.company}</div>}
              <div className="flex gap-2 flex-wrap">
                {project.technos.map((techno: string) => (
                  <LinkButton key={techno} href={`/?filters=${techno}#work`}>
                    {techno}
                  </LinkButton>
                ))}
              </div>
              <div>{project.content}</div>
              {project.url && (
                <ExternalLinkButton
                  href={project.url}
                  className="flex items-center gap-2 bg-yellow"
                >
                  Go to site
                  <Arrow />
                </ExternalLinkButton>
              )}
            </div>
          </div>
        </div>
      </Container>

      {project.media && project.media.length > 0 && renderMedia()}

      <Container className="my-4">
        <LinkButton
          href="/"
          className="flex items-center gap-2 mb-4 bg-text text-background border-text"
        >
          <Arrow color="white" orientation="left" />
          Go back
        </LinkButton>
      </Container>
    </article>
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
      images: [
        `images/projects/${project.slug}/${project.thumbnail}`,
        ...previousImages,
      ],
    },
  };
}
