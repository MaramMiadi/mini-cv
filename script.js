const projects = [
    {
        title: "Docker-based Network Function Virtualization",
        description:
            "Projet de virtualisation des fonctions réseau utilisant Docker, GNS3 et pfSense.",
        technologies: ["Docker", "GNS3", "pfSense"]
    },

    {
        title: "DevSecOps Portfolio",
        description:
            "Portfolio personnel évolué avec HTML5, CSS3, JavaScript et une architecture prête pour Docker.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Nginx"]
    },

    {
        title: "Kubernetes Lab",
        description:
            "Déploiement et gestion d'applications conteneurisées avec Kubernetes et K3s.",
        technologies: ["Kubernetes", "K3s", "Docker"]
    }
];

const projectsContainer =
    document.getElementById("projects-container");

projects.forEach(project => {

    const projectCard = document.createElement("article");

    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
        <h3>${project.title}</h3>

        <p>
            ${project.description}
        </p>

        <p class="project-tech">
            Technologies :
            ${project.technologies.join(" • ")}
        </p>
    `;

    projectsContainer.appendChild(projectCard);
});
