const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");
const { PrismaClient } = require("@prisma/client");
const { profile, projects, skills } = require("./data");

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const prisma = new PrismaClient();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb", strict: true }));

// Validation stricte des messages de contact.
const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Le nom doit contenir au moins 2 caractères.")
      .max(80, "Le nom ne doit pas dépasser 80 caractères.")
      .regex(
        /^[\p{L}\p{M}][\p{L}\p{M}\s'-]*$/u,
        "Le nom contient des caractères non autorisés."
      ),
    email: z
      .string()
      .trim()
      .email("Adresse e-mail invalide.")
      .max(254, "Adresse e-mail trop longue."),
    message: z
      .string()
      .trim()
      .min(10, "Le message doit contenir au moins 10 caractères.")
      .max(3000, "Le message ne doit pas dépasser 3000 caractères."),
  })
  .strict();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Trop de tentatives. Réessayez dans 15 minutes.",
    },
  },
});

// Vérification du service API.
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

// Validation et enregistrement des messages dans PostgreSQL.
app.post("/api/contact", contactLimiter, async (req, res, next) => {
  try {
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Les données envoyées sont invalides.",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    // Ne jamais renvoyer le contenu du message ou l'adresse e-mail.
    return res.status(201).json({
      message: "Votre message a été enregistré avec succès.",
      status: "saved",
      contact: {
        id: contact.id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
});

// Gestion centralisée des erreurs.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "Le corps de la requête contient un JSON invalide.",
      },
    });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      error: {
        code: "PAYLOAD_TOO_LARGE",
        message: "La requête dépasse la taille maximale autorisée.",
      },
    });
  }

  // Ne pas exposer les détails internes de la base de données au client.
  console.error("Erreur API :", {
    name: err.name,
    code: err.code,
    message: err.message,
  });

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Une erreur interne est survenue.",
    },
  });
});

// Gestion des routes inexistantes.
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route introuvable.",
      path: req.originalUrl,
    },
  });
});

// Démarrer le serveur uniquement si ce fichier est exécuté directement.
if (require.main === module) {
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`API Express démarrée sur le port ${PORT}`);
  });

  // Fermeture propre lors de l'arrêt du conteneur.
  async function shutdown() {
    console.log("Arrêt de l'API...");

    server.close(async () => {
      try {
        await prisma.$disconnect();
        process.exit(0);
      } catch (error) {
        console.error("Erreur lors de la fermeture de Prisma.");
        process.exit(1);
      }
    });

    setTimeout(() => process.exit(1), 10000).unref();
  }

  process.on("SIGTERM", shutdown);
}

module.exports = app;
