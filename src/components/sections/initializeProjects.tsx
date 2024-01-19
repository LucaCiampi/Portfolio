"use client";
/**
 * Sets up the properties to move the projects according to mouse movements
 */
export const initializeProjects = (animateGlide: FrameRequestCallback) => {
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
  animateGlide();
};
