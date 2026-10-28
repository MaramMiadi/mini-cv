import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects({ onlyFeatured = false, withTitle = true }) {
  const list = onlyFeatured ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="projects" className="section">
      <div className="container">
        {withTitle && <h2>Projets</h2>}
        <div className="projects-grid">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        {onlyFeatured && (
          <p className="more">
            <Link href="/projects">Voir tous les projets</Link>
          </p>
        )}
      </div>
    </section>
  );
}
