import { Suspense } from "react";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projets | DevSecOps Portfolio",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="container page-head">
        <h1>Tous les projets</h1>
        <p>Les réalisations de mon parcours DevSecOps.</p>
      </div>

      <Suspense fallback={<p className="container">Chargement des projets...</p>}>
        <Projects withTitle={false} />
      </Suspense>
    </>
  );
}
