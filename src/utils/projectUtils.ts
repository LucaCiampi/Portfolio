/**
 * Retourne les projets qui correspondent aux technologies et à la chaîne de recherche
 */
export function getProjectsByTechnologyAndSearchTerm(
  technologies: string[],
  searchTerm: string,
  projectsData: Project[]
): Project[] {
  return projectsData.filter((project: Project) => {
    const matchesTechnologies = technologies.every((technology) =>
      project.technos.includes(technology)
    );
    const matchesSearchTerm =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technos.some((techno) =>
        techno.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesTechnologies && matchesSearchTerm;
  });
}

/**
 * Regroupe les projets par année
 */
export function groupProjectsByYear(projects: Project[]): GroupedProjects {
  return projects.reduce((acc: GroupedProjects, project: Project) => {
    const year = project.date;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});
}

/**
 * Récupère les filtres depuis l'URL
 */
export function getFiltersParamFromURL(): string | null {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('filters');
}

/**
 * Met à jour les filtres dans l'URL
 */
export function updateFiltersToURL(activeFilters: string[]): void {
  const filtersParam =
    activeFilters.length > 0 ? `filters=${activeFilters.join(',')}` : '';
  const query = filtersParam ? `?${filtersParam}` : '';
  const url = `${window.location.pathname}${query}`;
  window.history.pushState({ path: url }, '', url);
}
