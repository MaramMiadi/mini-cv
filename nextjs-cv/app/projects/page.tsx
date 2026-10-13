import Projects from "@/components/Projects";

export const metadata = { title: "Projets | DevSecOps Portfolio" };

export default function ProjectsPage() {
  return (
    <>
      <div className="container page-head">
        <h1>Tous les projets</h1>
        <p>Les réalisations de mon parcours DevSecOps.</p>
      </div>
      <Projects withTitle={false} />
    </>
  );
}
