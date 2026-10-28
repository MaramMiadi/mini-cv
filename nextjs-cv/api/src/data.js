const profile = {
  name: "Maram Miadi",
  title: "DevSecOps Engineer",
  tagline:
    "J'automatise la livraison de logiciels et j'intègre la sécurité à chaque étape du pipeline.",
  about: [
    "Étudiante passionnée par le DevSecOps, je m'intéresse à l'automatisation CI/CD, à la conteneurisation et à la sécurisation des applications.",
    "Ce portfolio regroupe mes projets, mes compétences et la façon dont je construis des pipelines fiables et sécurisés.",
  ],
  email: "maram@example.com",
  github: "https://github.com/MaramMiadi",
  linkedin: "https://www.linkedin.com/in/your-profile",
  location: "Tunis, Tunisie",
};

const projects = [
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

const skills = [
  {
    category: "CI/CD & Automatisation",
    items: ["Jenkins", "GitHub Actions", "Git", "Bash"],
  },
  {
    category: "Conteneurs & Cloud",
    items: ["Docker", "Kubernetes", "Linux"],
  },
  {
    category: "Sécurité",
    items: ["OWASP Top 10", "Trivy", "SonarQube", "Gestion des secrets"],
  },
  {
    category: "Développement Web",
    items: ["HTML", "CSS", "JavaScript", "Next.js", "React"],
  },
];

module.exports = { profile, projects, skills };
