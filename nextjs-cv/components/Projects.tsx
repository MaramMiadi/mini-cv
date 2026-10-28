import Link from "next/link";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

type ProjectsProps = {
  onlyFeatured?: boolean;
  withTitle?: boolean;
};

async function getProjects(): Promise<Project[]> {
  const apiUrl = process.env.API_URL || "http://127.0.0.1:4000";

  const response = await fetch(`${apiUrl}/api/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Impossible de récupérer les projets : ${response.status}`);
  }

  return response.json();
}

export default async function Projects({
  onlyFeatured = false,
  withTitle = true,
}: ProjectsProps) {
  const projects = await getProjects();
  const list = onlyFeatured
    ? projects.filter((project) => project.featured)
    : projects;

  return (
    <section id="projects" className="section">
      <div className="container">
        {withTitle && <h2>Projets</h2>}

        <div className="projects-grid">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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
