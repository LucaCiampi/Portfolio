"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import projectsData from "json/projects.json";
import Link from "next/link";
import Button from "@/components/Button";

type Project = {
  title: string;
  description: string;
  date: number;
  slug: string;
  thumbnail: string;
  content: string;
  technos: string[];
  url?: string;
  repo?: string;
  company?: string;
  media?: {
    type: string;
    url: string;
    credits?: string;
  }[];
};

export default function WorkSection() {
  const technosFilters = ["Next.js", "React.js", "Three.js", "Unity"];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [projectsDisplayed, setProjectsDisplayed] = useState(() =>
    getProjectsByTechnology(activeFilters)
  );

  const customPointerRef = useRef<HTMLDivElement>(null!);

  /**
   * Sets up filters
   */
  useEffect(() => {
    const filtersParam = getFiltersParamFromURL();
    if (filtersParam) {
      const filters = filtersParam
        .split(",")
        .map((filter) => decodeURIComponent(filter));
      setActiveFilters(filters);
    }
  }, []);

  /**
   * Updates the project displayed according to active filters
   */
  useEffect(() => {
    setProjectsDisplayed(getProjectsByTechnology(activeFilters));
    const filtersParam =
      activeFilters.length > 0 ? `filters=${activeFilters.join(",")}` : "";
    const query = filtersParam ? `?${filtersParam}` : "";
    const url = `${window.location.pathname}${query}`;
    window.history.pushState({ path: url }, "", url);
  }, [activeFilters]);

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
   * When the user clicks on a filter, adds the element to the active filters list
   */
  function handleFilterClick(techno: string): void {
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(techno)) {
        return prevFilters.filter((prevFilter) => prevFilter !== techno);
      } else {
        return [...prevFilters, techno];
      }
    });
  }

  /**
   * Resets all filters
   */
  function handleFilterResetClick(): void {
    setActiveFilters([]);
  }

  /**
   * Adds event listener when mouse enters project
   */
  function handleProjectMouseEnter(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const project = event.target as HTMLElement;

    const customPointer = customPointerRef.current;
    customPointer.classList.remove("invisible");

    project.addEventListener("mousemove", handleProjectMouseMove);
  }

  /**
   * Moves the custom pointer according to real pointer position
   */
  function handleProjectMouseMove(event: MouseEvent): void {
    const customPointer = customPointerRef.current;

    customPointer.style.left = event.pageX + "px";
    customPointer.style.top = event.pageY + "px";
  }

  /**
   * Removes the event listener on project mouse leave
   */
  function handleProjectMouseLeave(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const project = event.target as HTMLElement;

    const customPointer = customPointerRef.current;

    customPointer.classList.add("invisible");

    project.removeEventListener("mousemove", handleProjectMouseMove);
  }

  /**
   * Animation on custom pointer when clicking
   */
  function handleProjectMouseDown(): void {
    customPointerRef.current.classList.remove("bg-amber-400");
    customPointerRef.current.classList.add("bg-lime-400");
  }

  const groupedProjects: { [year: number]: Project[] } =
    groupProjectsByYear(projectsDisplayed);
  return (
    <div>
      <div className="sticky top-0 bg-grey flex z-20 p-2">
        <div className="absolute bg-grey h-full w-full right-full top-0"></div>
        <div className="absolute bg-grey h-full w-full left-full top-0"></div>
        {technosFilters.map((techno) => (
          <Button
            key={techno}
            className={`mr-3 ${
              activeFilters.includes(techno) ? "olive text-white" : ""
            }`}
            onClick={() => handleFilterClick(techno)}
          >
            {techno}
          </Button>
        ))}
        <div className="cursor-pointer" onClick={handleFilterResetClick}>
          Clear filters
        </div>
      </div>
      <div className="mt-8">
        {Object.keys(groupedProjects)
          .sort()
          .reverse()
          .map((year) => (
            <div
              key={year}
              className="relative border-l-2 border-l-black pl-4 border-dashed pt-4 flex gap-12"
            >
              <h3>{year}</h3>
              <div className="grid grid-cols-2 w-full gap-4">
                {groupedProjects[Number(year)].map((project: Project) => (
                  <Link href={`/projects/${project.slug}`} key={project.slug}>
                    <div
                      className="cursor-none relative w-[400px] h-[250px]"
                      onMouseEnter={handleProjectMouseEnter}
                      onMouseLeave={handleProjectMouseLeave}
                      onMouseDown={handleProjectMouseDown}
                    >
                      {project.title}
                      <Image
                        src={`images/projects/${project.slug}/${project.thumbnail}`}
                        alt={project.title}
                        fill
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
