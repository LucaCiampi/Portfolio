'use client';

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import projectsData from 'json/projects.json';
import { AnimatePresence } from 'framer-motion';
import ProjectItem from '@/components/ProjectItem';
import FilterButton from '@/components/FilterButton';
import Image from 'next/image';
import SearchInput from '@/components/SearchInput';
import FILTERS from '@/constants/filters-constants';
import { PROJECT_ITEM_GLIDE_FRICTION } from '@/constants/animations-constants';
import Arrow from '@/components/Arrow';
import Container from '@/components/layout/Container';
import clsx from 'clsx';
import {
  getFiltersParamFromURL,
  getProjectsByTechnologyAndSearchTerm,
  groupProjectsByYear,
  updateFiltersToURL,
} from '@/utils/projectUtils';

export default function WorkSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [projectsDisplayed, setProjectsDisplayed] = useState<Project[]>(() =>
    getProjectsByTechnologyAndSearchTerm(
      activeFilters,
      searchTerm,
      projectsData
    )
  );
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const customPointerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<ProjectItemGlideData[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  /**
   * Anime les projets avec un effet de glissement
   */
  const glideProjects = useCallback(() => {
    projectsRef.current.forEach((ProjectItemGlideData) => {
      let { x, y, lFollowX, lFollowY, element } = ProjectItemGlideData;
      x += (lFollowX - x) * PROJECT_ITEM_GLIDE_FRICTION;
      y += (lFollowY - y) * PROJECT_ITEM_GLIDE_FRICTION;
      ProjectItemGlideData.x = x;
      ProjectItemGlideData.y = y;
      const translate = `translate(${x}px, ${y}px)`;
      element.style.transform = translate;
    });
    animationFrameIdRef.current = requestAnimationFrame(glideProjects);
  }, []);

  const animateGlide = useCallback(() => {
    glideProjects();
  }, [glideProjects]);

  /**
   * Initialise les projets pour l'animation de glissement
   */
  const initializeProjects = useCallback(() => {
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    const projects = Array.from(document.querySelectorAll('.project')).map(
      (project) => {
        const factorX = Math.random() * 2 - 1; // -1 à 1
        const factorY = Math.random() * 2 - 1; // -1 à 1
        return {
          element: project as HTMLElement,
          factorX,
          factorY,
          x: 0,
          y: 0,
          lFollowX: 0,
          lFollowY: 0,
        };
      }
    );
    projectsRef.current = projects;
    animateGlide();
  }, [animateGlide]);

  /**
   * Gère le mouvement de la souris
   *
   * @param event - Le mouvement de la souris
   */
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    projectsRef.current.forEach((ProjectItemGlideData) => {
      const { factorX, factorY } = ProjectItemGlideData;
      const lFollowX = ((clientX - window.innerWidth / 2) / 4) * factorX;
      const lFollowY = ((clientY - window.innerHeight / 2) / 4) * factorY;
      ProjectItemGlideData.lFollowX = lFollowX;
      ProjectItemGlideData.lFollowY = lFollowY;
    });
  }, []);

  /**
   * Gestion de l'effet de glissement en fonction du type d'appareil
   */
  useEffect(() => {
    const isTouchDevice = (): boolean => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (!isTouchDevice()) {
      window.addEventListener('mousemove', handleMouseMove);
      initializeProjects();
    }

    return () => {
      if (!isTouchDevice()) {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      }
    };
  }, [handleMouseMove, initializeProjects]);

  /**
   * Met à jour les projets affichés en fonction des filtres actifs et du terme de recherche
   */
  useEffect(() => {
    setProjectsDisplayed(
      getProjectsByTechnologyAndSearchTerm(
        activeFilters,
        searchTerm,
        projectsData
      )
    );
    updateFiltersToURL(activeFilters);
  }, [activeFilters, searchTerm]);

  /**
   * Réinitialise les projets lorsque la liste des projets affichés change
   */
  useEffect(() => {
    const isTouchDevice = (): boolean => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (!isTouchDevice()) {
      initializeProjects();
    }
  }, [projectsDisplayed, initializeProjects]);

  /**
   * Récupère les filtres actifs depuis l'URL lors du montage du composant
   */
  useEffect(() => {
    const filtersParam = getFiltersParamFromURL();
    if (filtersParam) {
      const filters = filtersParam
        .split(',')
        .map((filter) => decodeURIComponent(filter));
      setActiveFilters(filters);
    }
  }, []);

  /**
   * Gère le clic sur un filtre
   */
  const handleFilterClick = useCallback((techno: string): void => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(techno)
        ? prevFilters.filter((prevFilter) => prevFilter !== techno)
        : [...prevFilters, techno]
    );
  }, []);

  /**
   * Réinitialise tous les filtres
   */
  const handleFilterResetClick = useCallback((): void => {
    setActiveFilters([]);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000);
  }, []);

  /**
   * Groupe les projets par année
   */
  const groupedProjects = useMemo(
    () => groupProjectsByYear(projectsDisplayed),
    [projectsDisplayed]
  );

  /**
   * Affiche la liste des projets dans le DOM
   */
  const allProjects = useMemo(() => {
    let globalIndex = 0;
    return Object.keys(groupedProjects)
      .sort()
      .reverse()
      .flatMap((year) =>
        groupedProjects[Number(year)].map((project) => ({
          ...project,
          year: Number(year),
          globalIndex: globalIndex++,
        }))
      );
  }, [groupedProjects]);

  return (
    <>
      <div className="sticky top-0 bg-grey z-10 pl-12 2xl:pl-0 w-screen text-sm">
        <Container className="flex justify-between gap-4 py-3 overflow-scroll">
          <div className="flex items-center gap-4">
            {FILTERS.map((techno) => (
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
        </Container>
      </div>
      <div className="overflow-x-hidden">
        <Container className="mt-8 border-dashed border-l-2 border-text">
          <AnimatePresence>
            <div className="grid md:grid-cols-2 w-full gap-6 md:gap-16 py-12 lg:pl-16 pl-4 pr-0">
              {allProjects.map(({ title, year, globalIndex }) => (
                <div
                  className={clsx('project h-fit m-6 md:m-12 relative', {
                    'left-column': globalIndex % 2 === 0,
                    'right-column': globalIndex % 2 !== 0,
                  })}
                  key={title}
                >
                  {globalIndex === 0 ||
                  allProjects[globalIndex - 1].year !== year ? (
                    <div
                      key={year}
                      className="year-header absolute text-2xl font-semibold"
                    >
                      {year}
                    </div>
                  ) : null}
                  <ProjectItem project={allProjects[globalIndex]} />
                </div>
              ))}
            </div>
          </AnimatePresence>
        </Container>
        <div
          ref={customPointerRef}
          className="invisible flex gap-2 items-center border-text border-[1px] bg-text text-background pointer-events-none px-3 py-1 rounded-full absolute"
        >
          See details
          <Arrow color="white" />
        </div>
      </div>
    </>
  );
}
