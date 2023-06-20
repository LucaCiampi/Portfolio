import { GetStaticPaths } from 'next';
import educationsData from '../../../../json/projects.json';
import Image from 'next/image'
import PageWrapper from '../../page-wrapper'
import { getLocalProjectsData } from '../../../lib/localProjectsData';

interface PageProps {
  params: any,
}

export default function Page({ params }: PageProps) {
  // Recherche de l'objet correspondant au slug dans educationsData
  const project = educationsData.find((item) => item.slug === params.slug);

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
  const posts = await getLocalProjectsData();
 
  return posts.map((post:any) => ({
    slug: post.slug,
    post: post.content
  }))
}
