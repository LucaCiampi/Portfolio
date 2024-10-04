/**
 * Retourne les projets qui correspondent aux technologies et au terme de recherche.
 *
 * @param technologies - Liste des technologies à filtrer.
 * @param searchTerm - Terme de recherche pour filtrer les projets.
 * @param projectsData - Liste complète des projets.
 * @returns Liste des projets filtrés.
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
 * Regroupe les projets par année.
 *
 * @param projects - Liste des projets à regrouper.
 * @returns Un objet où chaque clé est une année et la valeur est un tableau de projets.
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
 * Récupère les filtres actifs depuis l'URL.
 *
 * @returns Une chaîne contenant les filtres actifs ou null s'il n'y en a pas.
 */
export function getFiltersParamFromURL(): string | null {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('filters');
}

/**
 * Met à jour les filtres actifs dans l'URL sans recharger la page.
 *
 * @param activeFilters - Liste des filtres actifs.
 */
export function updateFiltersToURL(activeFilters: string[]): void {
  const filtersParam =
    activeFilters.length > 0 ? `filters=${activeFilters.join(',')}` : '';
  const query = filtersParam ? `?${filtersParam}` : '';
  const url = `${window.location.pathname}${query}`;
  window.history.pushState({ path: url }, '', url);
}
