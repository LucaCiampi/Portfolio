"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper';
import Link from 'next/link';

export default function Page() {
  const technosFilters = ["Next.js", "React.js", "Three.js", "Unity"];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectsDisplayed, setProjectsDisplayed] = useState(() => getProjectsByTechnology(activeFilters));

  useEffect(() => {
    const filtersParam = getFiltersParamFromURL();
    if (filtersParam) {
      const filters = filtersParam.split(',').map(filter => decodeURIComponent(filter));
      setActiveFilters(filters);
    }
  }, []);

  useEffect(() => {
    setProjectsDisplayed(getProjectsByTechnology(activeFilters));
    const filtersParam = activeFilters.length > 0 ? `filters=${activeFilters.join(',')}` : '';
    const query = filtersParam ? `?${filtersParam}` : '';
    const url = `${window.location.pathname}${query}`;
    window.history.pushState({ path: url }, '', url);
  }, [activeFilters]);

  function getFiltersParamFromURL(): string | null {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('filters');
  }

  function handleFilterClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const clickedTechno = event.target as HTMLElement;
    clickedTechno.classList.toggle('bg-amber-400');

    setActiveFilters(prevFilters => {
      const filter = clickedTechno.innerText;

      if (prevFilters.includes(filter)) {
        return prevFilters.filter(prevFilter => prevFilter !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  }

  return (
    <PageWrapper>
      <div className='flex'>
        {technosFilters.map(techno => (
          <div
            key={techno}
            className={`mr-4 ${activeFilters.includes(techno) ? 'bg-amber-400' : ''}`}
            onClick={handleFilterClick}
          >
            {techno}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-3'>
        {projectsDisplayed.map(project => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <div>{project.title}</div>
            {/* TODO: use image optimization by NextJS */}
            <img src={`images/projects/${project.slug}/${project.thumbnail}`} alt={project.title} />
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}

function getProjectsByTechnology(technologies: string[]) {
  return projectsData.filter(project =>
    technologies.every(technology => project.technos.includes(technology))
  );
}
