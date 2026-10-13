import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1>Page introuvable</h1>
        <p>Ce projet n'existe pas ou a été déplacé.</p>
        <p>
          <Link href="/projects">Retour aux projets</Link>
        </p>
      </div>
    </section>
  );
}
