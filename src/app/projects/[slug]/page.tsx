import { GetStaticPaths } from 'next';
import educationsData from '../../../../json/projects.json';
import Image from 'next/image'
import PageWrapper from '../../page-wrapper'
import { getLocalProjectsData } from '../../../lib/localProjectsData';

interface PageProps {
  params: any,
}

const educationsIndex = educationsData.reduce((index: any, project) => {
  index[project.slug] = project;
  return index;
}, {});

export default function Page({ params }: PageProps) {
  const project = educationsIndex[params.slug];

  if (!project) {
    return <div>Projet introuvable</div>;
  }

  return (
    <div>
      <div>My Post: {project.slug}</div>
      <div>{project.content}</div>
    </div>
  );
}

export async function generateStaticParams() {
  return educationsData.map((post) => ({
    slug: post.slug,
    post: post.content,
  }));
}

