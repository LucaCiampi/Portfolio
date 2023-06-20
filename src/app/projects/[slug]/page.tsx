import projectsData from 'json/projects.json';
import PageWrapper from '../../page-wrapper'
import Image from 'next/image'

const educationsIndex = projectsData.reduce((index: any, project) => {
  index[project.slug] = project;
  return index;
}, {});

interface PageProps {
  params: { slug: string },
}

export default function Page({ params }: PageProps) {
  const project = educationsIndex[params.slug];

  if (!project) {
    return <div>Projet introuvable</div>;
  }

  return (
    <PageWrapper>
      <div>My Post: {project.slug}</div>
      <div>{project.content}</div>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return projectsData.map((post) => ({
    slug: post.slug
  }));
}

