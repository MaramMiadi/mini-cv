import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.name}</Link>
      </h3>
      <p>{project.summary}</p>
      <ul className="tags">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </article>
  );
}
