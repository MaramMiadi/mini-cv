import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  featured?: boolean;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata = {
  title: "Détails du projet | DevSecOps Portfolio",
};

async function getProjects(): Promise<Project[]> {
  const apiUrl = process.env.API_URL || "http://127.0.0.1:4000";

  const response = await fetch(`${apiUrl}/api/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les projets : ${response.status}`
    );
  }

  return response.json();
}

async function ProjectDetails({ params }: Props) {
  const { slug } = await params;

  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container project-detail">
        <p>
          <Link href="/projects">← Retour aux projets</Link>
        </p>

        <h1>{project.name}</h1>
        <p className="lead">{project.description}</p>

        <h2>Technologies</h2>
        <ul className="tags">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {project.highlights.length > 0 && (
          <>
            <h2>Points clés</h2>
            <ul className="highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </>
        )}

        {project.repo && (
          <p>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le code sur GitHub
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <p className="container">Chargement du projet...</p>
      }
    >
      <ProjectDetails params={params} />
    </Suspense>
  );
}
