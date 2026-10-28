type SkillGroup = {
  category: string;
  items: string[];
};

async function getSkills(): Promise<SkillGroup[]> {
  const apiUrl = process.env.API_URL || "http://127.0.0.1:4000";

  const response = await fetch(`${apiUrl}/api/skills`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les compétences : ${response.status}`,
    );
  }

  return response.json();
}

export default async function Skills() {
  const skillGroups = await getSkills();

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
