import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper'
import Image from 'next/image'
import Link from 'next/link';

export default function Page() {
  return (
    <PageWrapper>
      <div>
        projects
        {projectsData.map((project) => (
          <Link href={'/projects/' + project.slug}>
            <div>{project.title}</div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  )
}
