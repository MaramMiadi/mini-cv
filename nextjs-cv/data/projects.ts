// Données des projets. Le champ `slug` sert d'URL : /projects/<slug>
export const projects = [
  {
    slug: "mini-cv",
    name: "Mini CV",
    summary: "Premier portfolio en HTML, CSS et JavaScript.",
    description:
      "Version statique du DevSecOps Portfolio : sections À propos, Compétences, Projets et Contact, entièrement responsive.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Mise en page responsive",
      "Navigation par ancres",
      "Hébergé sur GitHub",
    ],
    repo: "https://github.com/MaramMiadi/mini-cv",
    featured: true,
  },
  {
    slug: "portfolio-nextjs",
    name: "Portfolio Next.js",
    summary: "Migration du portfolio vers Next.js avec composants réutilisables.",
    description:
      "Réécriture du portfolio avec l'App Router de Next.js : composants, données séparées et pages dynamiques pour chaque projet.",
    stack: ["Next.js", "React", "CSS"],
    highlights: [
      "Composants Header, About, Skills, Projects, Contact, Footer",
      "Données séparées du code",
      "Routes dynamiques /projects/[slug]",
    ],
    repo: "https://github.com/MaramMiadi/mini-cv",
    featured: true,
  },
  {
    slug: "pipeline-jenkins",
    name: "Pipeline Jenkins",
    summary: "Pipeline CI qui récupère, installe et construit le portfolio.",
    description:
      "Pipeline déclaratif Jenkins : checkout du dépôt GitHub, installation des dépendances avec npm ci puis build de l'application Next.js.",
    stack: ["Jenkins", "Node.js", "Git"],
    highlights: [
      "Checkout automatique depuis GitHub",
      "Installation reproductible (npm ci)",
      "Build Next.js automatisé",
    ],
    repo: "https://github.com/MaramMiadi/mini-cv",
    featured: true,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
