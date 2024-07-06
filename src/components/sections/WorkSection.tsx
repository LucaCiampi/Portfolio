'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import projectsData from 'json/projects.json';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectItem, { Project } from '@/components/ProjectItem';
import FilterButton from '@/components/FilterButton';
import Image from 'next/image';
import SearchInput from '@/components/SearchInput';
import Filters from '@/constants/Filters';
import Arrow from '@/components/Arrow';

export default function WorkSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsDisplayed, setProjectsDisplayed] = useState(() =>
    getProjectsByTechnologyAndSearchTerm(activeFilters, searchTerm)
  );
  const [isRotating, setIsRotating] = useState(false);
  const customPointerRef = useRef<HTMLDivElement>(null!);

  /**
   * Recursive function to animate the projects gliding movement
   */
  const animateGlide = useCallback(() => {
    glideProjects(animateGlide);
  }, []);

  /**
   * OnMount
   */
  useEffect(() => {
    console.log('useEffect[]');

    // Sets active filters from URL
    const filtersParam = getFiltersParamFromURL();
    if (filtersParam) {
      const filters = filtersParam
        .split(',')
        .map((filter) => decodeURIComponent(filter));
      setActiveFilters(filters);
    }

    // Adds movement to projects according to mouse
    window.addEventListener('mousemove', handleMouseMove);
    initializeProjects(animateGlide);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animateGlide]);

  /**
   * Updates the project displayed according to active filters
   */
  useEffect(() => {
    setProjectsDisplayed(
      getProjectsByTechnologyAndSearchTerm(activeFilters, searchTerm)
    );
    updateFiltersToURL(activeFilters);
  }, [activeFilters, searchTerm]);

  /**
   * Reinitializes projects movements on new display
   */
  useEffect(() => {
    initializeProjects(animateGlide);
  }, [projectsDisplayed, animateGlide]);

  /**
   * When the user clicks on a filter, adds the element to the active filters list
   */
  const handleFilterClick = useCallback((techno: string): void => {
    console.log('handleFilterClick');
    setActiveFilters((prevFilters) =>
      prevFilters.includes(techno)
        ? prevFilters.filter((prevFilter) => prevFilter !== techno)
        : [...prevFilters, techno]
    );
  }, []);

  /**
   * Resets all filters
   */
  const handleFilterResetClick = useCallback((): void => {
    console.log('handleFilterResetClick');
    setActiveFilters([]);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000);
  }, []);

  /**
   * Moves the custom pointer according to real pointer position
   */
  const handleProjectMouseMove = useCallback((event: MouseEvent): void => {
    console.log('handleProjectMouseMove');
    const customPointer = customPointerRef.current;
    customPointer.style.left = `${event.pageX}px`;
    customPointer.style.top = `${event.pageY}px`;
  }, []);

  /**
   * Adds event listener when mouse enters project
   */
  const handleProjectMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      const project = event.currentTarget;
      const customPointer = customPointerRef.current;
      customPointer.classList.remove('invisible');
      project.addEventListener('mousemove', handleProjectMouseMove);
    },
    [handleProjectMouseMove]
  );

  /**
   * Removes the event listener on project mouse leave
   */
  const handleProjectMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      const project = event.currentTarget;
      const customPointer = customPointerRef.current;
      customPointer.classList.add('invisible');
      project.removeEventListener('mousemove', handleProjectMouseMove);
    },
    [handleProjectMouseMove]
  );

  /**
   * Animation on custom pointer when clicking
   */
  const handleProjectMouseDown = useCallback((): void => {
    const customPointer = customPointerRef.current;
    customPointer.classList.add('!bg-green');
  }, []);

  const groupedProjects = useMemo(
    () => groupProjectsByYear(projectsDisplayed),
    [projectsDisplayed]
  );

  const allProjects = useMemo(() => {
    let globalIndex = 0;
    return Object.keys(groupedProjects)
      .sort()
      .reverse()
      .flatMap((year) =>
        groupedProjects[Number(year)].map((project) => ({
          ...project,
          year,
          globalIndex: globalIndex++,
        }))
      );
  }, [groupedProjects]);

  return (
    <>
      <div className="sticky top-0 bg-grey z-10 pt-16 md:pt-24 -mt-14 md:-mt-28 w-screen text-sm">
        <div className="xl:container mx-auto flex justify-between gap-4 py-2 overflow-scroll">
          <div className="flex items-center gap-4">
            {Filters.map((techno) => (
              <FilterButton
                key={techno}
                techno={techno}
                isActive={activeFilters.includes(techno)}
                onClick={handleFilterClick}
              />
            ))}
            <div
              className="cursor-pointer flex gap-2 items-center w-max"
              onClick={handleFilterResetClick}
            >
              <div className={isRotating ? 'rotate-360' : ''}>
                <Image
                  src="/images/cross.svg"
                  alt="cross"
                  height={9}
                  width={9}
                  className="mt-[2px]"
                />
              </div>
              Clear filters
            </div>
          </div>
          <SearchInput
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-hidden">
        <div className="xl:container mx-auto mt-8 border-dashed border-l-2 border-text">
          <AnimatePresence>
            <div className="grid grid-cols-2 w-full gap-16 py-12 pl-16 pr-0">
              {allProjects.map(({ title, year, globalIndex }) => (
                <div
                  className={`project h-fit m-12 relative ${
                    globalIndex % 2 === 0 ? 'left-column' : 'right-column'
                  }`}
                  onMouseEnter={handleProjectMouseEnter}
                  onMouseLeave={handleProjectMouseLeave}
                  onMouseDown={handleProjectMouseDown}
                  key={title}
                >
                  {globalIndex === 0 ||
                  allProjects[globalIndex - 1].year !== year ? (
                    <div key={year} className="year-header absolute">
                      {year}
                    </div>
                  ) : null}
                  <ProjectItem project={allProjects[globalIndex]} />
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>
        <div
          ref={customPointerRef}
          className="invisible flex gap-2 items-center border-text border-[1px] bg-background pointer-events-none px-3 py-1 rounded-full absolute"
        >
          See details
          <Arrow />
        </div>
      </div>
    </>
  );
}

/**
 * Retourne les projets qui correspondent aux technologies et à la chaîne de recherche
 * @param technologies Liste des technologies
 * @param searchTerm Chaîne de recherche
 * @returns Array de projets correspondants
 */
function getProjectsByTechnologyAndSearchTerm(
  technologies: string[],
  searchTerm: string
): Array<Project> {
  return projectsData.filter(
    (project) =>
      technologies.every((technology) =>
        project.technos.includes(technology)
      ) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technos.some((techno) =>
          techno.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );
}

/**
 * Returns projects grouped by year
 * @param projects the array of visible projects
 * @returns Array of projects grouped by year (number)
 */
function groupProjectsByYear(projects: Project[]): {
  [year: number]: Project[];
} {
  return projects.reduce((acc: { [year: number]: Project[] }, project) => {
    const year = project.date;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});
}

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
 * Puts the active filters in the URL
 * @param activeFilters the array of active filters in the useState
 */
function updateFiltersToURL(activeFilters: Array<String>): void {
  const filtersParam =
    activeFilters.length > 0 ? `filters=${activeFilters.join(',')}` : '';
  const query = filtersParam ? `?${filtersParam}` : '';
  const url = `${window.location.pathname}${query}`;
  window.history.pushState({ path: url }, '', url);
}

/**
 * Handles the movement of the mouse (on all of the DOM)
 */
const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event;
  document.querySelectorAll('.project').forEach((project) => {
    const factorX = Number(project.getAttribute('data-factor-x'));
    const factorY = Number(project.getAttribute('data-factor-y'));
    const lFollowX = ((clientX - window.innerWidth / 2) / 4) * factorX;
    const lFollowY = ((clientY - window.innerHeight / 2) / 4) * factorY;
    project.setAttribute('data-l-follow-x', String(lFollowX));
    project.setAttribute('data-l-follow-y', String(lFollowY));
  });

  console.log('HandleMouseMove');
};

/**
 * Makes the projects move with a gliding effect
 */
const friction = 0.1;
function glideProjects(animateGlide: FrameRequestCallback) {
  document.querySelectorAll('.project').forEach((project) => {
    let x = Number(project.getAttribute('data-x'));
    let y = Number(project.getAttribute('data-y'));
    const lFollowX = Number(project.getAttribute('data-l-follow-x'));
    const lFollowY = Number(project.getAttribute('data-l-follow-y'));
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
    project.setAttribute('data-x', String(x));
    project.setAttribute('data-y', String(y));
    const translate = `translate(${x}px, ${y}px)`;
    if (project instanceof HTMLElement) {
      project.style.transform = translate;
    }
  });
  requestAnimationFrame(animateGlide);

  console.log('GLIDE projects');
}

/**
 * Sets up the properties to move the projects according to mouse movements
 */
const initializeProjects = (animateGlide: FrameRequestCallback) => {
  console.log('initializeprojects');

  document.querySelectorAll('.project').forEach((project) => {
    // Définir des facteurs aléatoires pour chaque projet
    project.setAttribute('data-factor-x', String(Math.random() * 2 - 1)); // -1 à 1
    project.setAttribute('data-factor-y', String(Math.random() * 2 - 1)); // -1 à 1

    // Réinitialiser les valeurs pour l'animation
    project.setAttribute('data-x', '0');
    project.setAttribute('data-y', '0');
    project.setAttribute('data-l-follow-x', '0');
    project.setAttribute('data-l-follow-y', '0');

    // Ajouter tout autre gestionnaire d'événements ou attributs nécessaires ici
  });

  // Si votre animation de glissement est dans une fonction séparée, appelez-la ici
  animateGlide(1);
};
