"use client";

import projectsData from 'json/projects.json';
import PageWrapper from '../page-wrapper'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [projectsDisplayed, setProjectsDisplayed] = useState(projectsData);
  const technosFilters = ["Next.js", "Three.js"]

  function handleFilterOnclick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const input = event.target as HTMLElement;
    setProjectsDisplayed(getProjectsByTechnology(input.innerHTML))
    input.classList.toggle('selected')
  }

  return (
    <PageWrapper>
      <div>
        {technosFilters.map((filter) => (
          <div key={filter} onClick={handleFilterOnclick}>{filter}</div>
        ))}
      </div>
      <div>
        projects
        {projectsDisplayed.map((project) => (
          <Link href={'/projects/' + project.slug} key={project.slug}>
            <div>{project.title}</div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  )
}

function Filters() {
  const technosFilters = ["Next.js", "Three.js"]

  function handleFilterOnclick(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
    setProjectsDisplayed(getProjectsByTechnology(event.target.innerHTML.toString()))
  }

  return (
    <div>
      {technosFilters.map((filter) => (
        <div key={filter} onClick={handleFilterOnclick}>{filter}</div>
      ))}
    </div>
  )
}

function getProjectsByTechnology(technology: string) {
  return projectsData.filter(project => project.technos.includes(technology));
}
