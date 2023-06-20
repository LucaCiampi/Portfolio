"use client";

import { useEffect, useState } from 'react';
import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const technosFilters = ["Next.js", "Three.js"];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectsDisplayed, setProjectsDisplayed] = useState(() => {
    return getProjectsByTechnology(activeFilters);
  });

  function handleFilterClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const clickedTechno = (event.target as HTMLElement);
    clickedTechno.classList.toggle('active');

    setActiveFilters(prevFilters => {
      const filter = clickedTechno.innerText;

      if (prevFilters.includes(filter)) {
        return prevFilters.filter(prevFilter => prevFilter !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  }

  useEffect(() => {
    setProjectsDisplayed(getProjectsByTechnology(activeFilters));
  }, [activeFilters]);

  return (
    <PageWrapper>
      <div className='flex'>
        {technosFilters.map(techno => (
          <div
            key={techno}
            className='mr-4'
            onClick={handleFilterClick}
          >
            {techno}
          </div>
        ))}
      </div>
      <div>
        {projectsDisplayed.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <div>{project.title}</div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}

function getProjectsByTechnology(technologies: string[]) {
  return projectsData.filter(project => {
    return technologies.every(technology => project.technos.includes(technology));
  });
}