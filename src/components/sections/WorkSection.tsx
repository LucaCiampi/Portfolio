"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import projectsData from "json/projects.json";
import Link from "next/link";
import Button from "@/components/Button";
import React from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import ProjectItem, { Project } from "../ProjectItem";
import FilterButton from "../FilterButton";
import { Action } from "lottie-react";
import CrossIcon from "public/images/cross.svg";

export default function WorkSection() {
  const technosFilters = ["Next.js", "React.js", "Three.js", "Unity"];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectsDisplayed, setProjectsDisplayed] = useState(() =>
    getProjectsByTechnology(activeFilters)
  );
  const customPointerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    console.log("useEffect[]");

    // Sets active filters from URL
    const filtersParam = getFiltersParamFromURL();
    if (filtersParam) {
      const filters = filtersParam
        .split(",")
        .map((filter) => decodeURIComponent(filter));
      setActiveFilters(filters);
    }

    // Adds movement to projects according to mouse
    window.addEventListener("mousemove", handleMouseMove);
    initializeProjects(animateGlide);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const animateGlide = useCallback(() => {
    glideProjects(animateGlide);
  }, []);

  /**
   * Updates the project displayed according to active filters
   */
  useEffect(() => {
    setProjectsDisplayed(getProjectsByTechnology(activeFilters));
    updateFiltersToURL(activeFilters);
  }, [activeFilters]);

  /**
   * Reinitializes projects movements on new display
   */
  useEffect(() => {
    initializeProjects(animateGlide);
  }, [projectsDisplayed]);

  /**
   * When the user clicks on a filter, adds the element to the active filters list
   */
  const handleFilterClick = useCallback((techno: string): void => {
    console.log("handleFilterClick");
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
    console.log("handleFilterResetClick");
    setActiveFilters([]);
  }, []);

  /**
   * Moves the custom pointer according to real pointer position
   */
  const handleProjectMouseMove = useCallback((event: MouseEvent): void => {
    console.log("handleProjectMouseMove");
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
      customPointer.classList.remove("invisible");
      project.addEventListener("mousemove", handleProjectMouseMove);
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
      customPointer.classList.add("invisible");
      project.removeEventListener("mousemove", handleProjectMouseMove);
    },
    [handleProjectMouseMove]
  );

  /**
   * Animation on custom pointer when clicking
   */
  const handleProjectMouseDown = useCallback((): void => {
    const customPointer = customPointerRef.current;
    customPointer.classList.remove("bg-amber-400");
    customPointer.classList.add("bg-lime-400");
  }, []);

  const groupedProjects = useMemo(
    () => groupProjectsByYear(projectsDisplayed),
    [projectsDisplayed]
  );

  return (
    <div>
      <div className="sticky text-white top-0 bg-grey flex gap-2 z-20 p-2">
        <div className="absolute bg-grey h-full w-full right-full top-0"></div>
        <div className="absolute bg-grey h-full w-full left-full top-0"></div>
        {technosFilters.map((techno) => (
          <FilterButton
            key={techno}
            techno={techno}
            activeFilters={activeFilters}
            onClick={handleFilterClick}
          />
        ))}
        <div
          className="cursor-pointer flex gap-2 items-center"
          onClick={handleFilterResetClick}
        >
          <CrossIcon />
          Clear filters
        </div>
      </div>
      <div className="mt-8 overflow-hidden">
        <AnimatePresence>
          {Object.keys(groupedProjects)
            .sort()
            .reverse()
            .map((year) => (
              <AnimatedYearGroupDiv year={year} key={year}>
                <h3>{year}</h3>
                <div className="grid grid-cols-2 w-full gap-4">
                  <AnimatePresence>
                    {groupedProjects[Number(year)].map((project: Project) => (
                      <ProjectItem key={project.title} project={project}>
                        <Link
                          href={`/projects/${project.slug}`}
                          key={project.slug}
                        >
                          <div
                            className="project cursor-none relative w-[400px] h-[250px]"
                            onMouseEnter={handleProjectMouseEnter}
                            onMouseLeave={handleProjectMouseLeave}
                            onMouseDown={handleProjectMouseDown}
                            // {...animations}
                          >
                            {project.title}
                            <Image
                              src={`images/projects/${project.slug}/${project.thumbnail}`}
                              alt={project.title}
                              width={9}
                              height={16}
                              layout="responsive"
                            />
                          </div>
                        </Link>
                      </ProjectItem>
                    ))}
                  </AnimatePresence>
                </div>
              </AnimatedYearGroupDiv>
            ))}
        </AnimatePresence>
      </div>
      <div
        ref={customPointerRef}
        className="custom-pointer invisible bg-amber-400"
      >
        See details
      </div>
    </div>
  );
}

const AnimatedYearGroupDiv = ({ year, children }: any) => {
  const isPresent = useIsPresent();
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    // transition: {
    //   type: "spring",
    //   stiffness: 900,
    //   damping: 40,
    // },
  };

  return (
    <motion.div
      className="relative border-l-2 border-l-black pl-4 border-dashed pt-4 flex gap-12"
      {...animations}
      layout
      key={year}
    >
      {children}
    </motion.div>
  );
};

function getProjectsByTechnology(technologies: string[]) {
  return projectsData.filter((project) =>
    technologies.every((technology) => project.technos.includes(technology))
  );
}

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
  return urlParams.get("filters");
}

/**
 * Puts the active filters in the URL
 * @param activeFilters the array of active filters in the useState
 */
function updateFiltersToURL(activeFilters: Array<String>): void {
  const filtersParam =
    activeFilters.length > 0 ? `filters=${activeFilters.join(",")}` : "";
  const query = filtersParam ? `?${filtersParam}` : "";
  const url = `${window.location.pathname}${query}`;
  window.history.pushState({ path: url }, "", url);
}

const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event;
  document.querySelectorAll(".project").forEach((project) => {
    const factorX = Number(project.getAttribute("data-factor-x"));
    const factorY = Number(project.getAttribute("data-factor-y"));
    const lFollowX = ((clientX - window.innerWidth / 2) / 4) * factorX;
    const lFollowY = ((clientY - window.innerHeight / 2) / 4) * factorY;
    project.setAttribute("data-l-follow-x", String(lFollowX));
    project.setAttribute("data-l-follow-y", String(lFollowY));
  });

  console.log("HandleMouseMove");
};

const friction = 0.1;
function glideProjects(animateGlide: FrameRequestCallback) {
  document.querySelectorAll(".project").forEach((project) => {
    let x = Number(project.getAttribute("data-x"));
    let y = Number(project.getAttribute("data-y"));
    const lFollowX = Number(project.getAttribute("data-l-follow-x"));
    const lFollowY = Number(project.getAttribute("data-l-follow-y"));
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
    project.setAttribute("data-x", String(x));
    project.setAttribute("data-y", String(y));
    const translate = `translate(${x}px, ${y}px)`;
    project.style.transform = translate;
  });
  requestAnimationFrame(animateGlide);

  console.log("GLIDE projects");
}

/**
 * Sets up the properties to move the projects according to mouse movements
 */
const initializeProjects = (animateGlide: FrameRequestCallback) => {
  console.log("initializeprojects");

  document.querySelectorAll(".project").forEach((project) => {
    // Définir des facteurs aléatoires pour chaque projet
    project.setAttribute("data-factor-x", String(Math.random() * 2 - 1)); // -1 à 1
    project.setAttribute("data-factor-y", String(Math.random() * 2 - 1)); // -1 à 1

    // Réinitialiser les valeurs pour l'animation
    project.setAttribute("data-x", "0");
    project.setAttribute("data-y", "0");
    project.setAttribute("data-l-follow-x", "0");
    project.setAttribute("data-l-follow-y", "0");

    // Ajouter tout autre gestionnaire d'événements ou attributs nécessaires ici
  });

  // Si votre animation de glissement est dans une fonction séparée, appelez-la ici
  animateGlide(1);
};
