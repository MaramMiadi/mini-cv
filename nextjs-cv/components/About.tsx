import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="hero-role">{profile.title}</p>
        <h1 className="hero-title">{profile.tagline}</h1>
        <div className="about-text">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
