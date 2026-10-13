import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";

// Pré-génère une page statique par projet au moment du build
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  return { title: project ? `${project.name} | Projets` : "Projet introuvable" };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

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
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h2>Points clés</h2>
        <ul className="highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <p>
          <a className="button" href={project.repo} target="_blank" rel="noopener noreferrer">
            Voir le code sur GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
