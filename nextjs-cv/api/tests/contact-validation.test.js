const request = require("supertest");
const app = require("../src/server");

describe("POST /api/contact - validation", () => {
  it("rejette les champs obligatoires manquants", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({});

    expect(response.status).toBe(400);
  });

  it("rejette une adresse email invalide", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Test User",
        email: "email-invalide",
        message: "Bonjour, ceci est un message de test.",
      });

    expect(response.status).toBe(400);
  });

  it("rejette un JSON mal formé", async () => {
    const response = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send('{"name":');

    expect(response.status).toBe(400);
  });
});
