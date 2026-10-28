const express = require("express");
const { profile, projects, skills } = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "devsecops-api",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/profile", (req, res) => {
  res.status(200).json(profile);
});

app.get("/api/projects", (req, res) => {
  res.status(200).json(projects);
});

app.get("/api/skills", (req, res) => {
  res.status(200).json(skills);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route introuvable",
    path: req.originalUrl,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Express démarrée sur le port ${PORT}`);
});
