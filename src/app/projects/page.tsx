"use client";

import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [projectsDisplayed, setProjectsDisplayed] = useState(projectsData);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const technosFilters = ["Next.js", "Three.js"];

  function handleFilterClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const clickedTechno = (event.target as HTMLElement);

    clickedTechno.classList.toggle('active');

    if (activeFilters.includes(clickedTechno.innerText)) {
      const updatedFilters = activeFilters.filter(filter => filter !== clickedTechno.innerText);
      setActiveFilters(updatedFilters);
    } else {
      const updatedFilters = [...activeFilters, clickedTechno.innerText];
      setActiveFilters(updatedFilters);
    }
  }

  useEffect(() => {
    const filteredProjects = getProjectsByTechnology(activeFilters);
    setProjectsDisplayed(filteredProjects);
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
          <Link href={'/projects/' + project.slug} key={project.slug}>
            <div>{project.title}</div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  )
}

function getProjectsByTechnology(technologies: string[]) {
  const filteredProjects = projectsData.filter(project => {
    return technologies.every(technology => project.technos.includes(technology));
  });

  return filteredProjects
}
