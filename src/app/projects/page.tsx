"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper';
import Link from 'next/link';

export default function Page() {
  const technosFilters = ["Next.js", "React.js", "Three.js", "Unity"];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectsDisplayed, setProjectsDisplayed] = useState(() => getProjectsByTechnology(activeFilters));

  const customPointerRef = useRef<HTMLDivElement>(null!);

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

  function handleFilterClick(techno: string): void {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(techno)) {
        return prevFilters.filter(prevFilter => prevFilter !== techno);
      } else {
        return [...prevFilters, techno];
      }
    });
  }

  function handleProjectMouseEnter(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const project = event.target as HTMLElement;

    const customPointer = customPointerRef.current;
    if (customPointer) {
      customPointer.classList.remove('invisible')
    }

    project.addEventListener('mousemove', handleProjectMouseMove);
  }

  function handleProjectMouseMove(event: MouseEvent): void {
    const customPointer = customPointerRef.current;
    // if (customPointer) {
      customPointer.style.left = event.pageX + 'px';
      customPointer.style.top = event.pageY + 'px';
    // }
  }

  function handleProjectMouseLeave(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const project = event.target as HTMLElement;

    const customPointer = customPointerRef.current;
    if (customPointer) {
      customPointer.classList.add('invisible')
    }

    project.removeEventListener('mousemove', handleProjectMouseMove);
  }

  return (
    <PageWrapper>
      <div className='flex'>
        {technosFilters.map(techno => (
          <div
            key={techno}
            className={`mr-4 ${activeFilters.includes(techno) ? 'bg-amber-400' : ''}`}
            onClick={() => handleFilterClick(techno)}
          >
            {techno}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-3'>
        {projectsDisplayed.map(project => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <div
              className="cursor-none"
              onMouseEnter={handleProjectMouseEnter}
              onMouseLeave={handleProjectMouseLeave}
            >
              {project.title}
              {/* TODO: use image optimization by NextJS */}
              <img src={`images/projects/${project.slug}/${project.thumbnail}`} alt={project.title} />
            </div>
          </Link>
        ))}
      </div>
      <div ref={customPointerRef} className='custom-pointer invisible'>See details</div>
    </PageWrapper>
  );
}

function getProjectsByTechnology(technologies: string[]) {
  return projectsData.filter(project =>
    technologies.every(technology => project.technos.includes(technology))
  );
}