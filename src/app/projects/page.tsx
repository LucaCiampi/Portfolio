"use client";

import { useEffect, useState, useRef } from 'react';
import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper';
import Link from 'next/link';
import Button from '@/components/Button';

export default function Page() {
  const technosFilters = ["Next.js", "React.js", "Three.js", "Unity"];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectsDisplayed, setProjectsDisplayed] = useState(() => getProjectsByTechnology(activeFilters));

  const customPointerRef = useRef<HTMLDivElement>(null!);

  /**
   * Sets up filters
   */
  useEffect(() => {
    const filtersParam = getFiltersParamFromURL();
    if (filtersParam) {
      const filters = filtersParam.split(',').map(filter => decodeURIComponent(filter));
      setActiveFilters(filters);
    }
  }, []);

  /**
   * Updates the project displayed according to active filters
   */
  useEffect(() => {
    setProjectsDisplayed(getProjectsByTechnology(activeFilters));
    const filtersParam = activeFilters.length > 0 ? `filters=${activeFilters.join(',')}` : '';
    const query = filtersParam ? `?${filtersParam}` : '';
    const url = `${window.location.pathname}${query}`;
    window.history.pushState({ path: url }, '', url);
  }, [activeFilters]);

  /**
   * Retrieves the eventual list of active filters when visiting the page
   * @returns {string | null} the list of filters
   */
  function getFiltersParamFromURL(): string | null {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('filters');
  }

  /**
   * When the user clicks on a filter, adds the element to the active filters list
   */
  function handleFilterClick(techno: string): void {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(techno)) {
        return prevFilters.filter(prevFilter => prevFilter !== techno);
      } else {
        return [...prevFilters, techno];
      }
    });
  }

  /**
   * Adds event listener when mouse enters project
   */
  function handleProjectMouseEnter(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const project = event.target as HTMLElement;

    const customPointer = customPointerRef.current;
    customPointer.classList.remove('invisible')

    project.addEventListener('mousemove', handleProjectMouseMove);
  }

  /**
   * Moves the custom pointer according to real pointer position
   */
  function handleProjectMouseMove(event: MouseEvent): void {
    const customPointer = customPointerRef.current;

    customPointer.style.left = event.pageX + 'px';
    customPointer.style.top = event.pageY + 'px';
  }

  /**
   * Removes the event listener on project mouse leave
   */
  function handleProjectMouseLeave(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const project = event.target as HTMLElement;

    const customPointer = customPointerRef.current;

    customPointer.classList.add('invisible')

    project.removeEventListener('mousemove', handleProjectMouseMove);
  }

  /**
   * Animation on custom pointer when clicking
   */
  function handleProjectMouseDown(): void {
    customPointerRef.current.classList.remove('bg-amber-400')
    customPointerRef.current.classList.add('bg-lime-400')
  }

  return (
    <PageWrapper>
      <div className='flex'>
        {technosFilters.map(techno => (
          <Button
            key={techno}
            className={`mr-4 ${activeFilters.includes(techno) ? 'bg-rose-400' : ''}`}
            onClick={() => handleFilterClick(techno)}
          >
            {techno}
          </Button>
        ))}
      </div>
      <div className='grid grid-cols-3'>
        {projectsDisplayed.map(project => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <div
              className="cursor-none"
              onMouseEnter={handleProjectMouseEnter}
              onMouseLeave={handleProjectMouseLeave}
              onMouseDown={handleProjectMouseDown}
            >
              {project.title}
              {/* TODO: use image optimization by NextJS */}
              <img src={`images/projects/${project.slug}/${project.thumbnail}`} alt={project.title} />
            </div>
          </Link>
        ))}
      </div>
      <div ref={customPointerRef} className='custom-pointer invisible bg-amber-400'>See details</div>
    </PageWrapper>
  );
}

function getProjectsByTechnology(technologies: string[]) {
  return projectsData.filter(project =>
    technologies.every(technology => project.technos.includes(technology))
  );
}