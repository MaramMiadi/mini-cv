import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h2>Compétences</h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-group">
              <h3>{group.category}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
