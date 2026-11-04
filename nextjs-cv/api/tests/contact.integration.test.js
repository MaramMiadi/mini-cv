const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("../src/server");

const prisma = new PrismaClient();

describe("POST /api/contact - integration PostgreSQL", () => {
  const testEmail = `integration-${Date.now()}@example.com`;
  const testMessage = `Q60 integration test ${Date.now()}`;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("enregistre un message dans PostgreSQL", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Integration Test",
        email: testEmail,
        message: testMessage,
      });

    console.log("API response:", JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("saved");
    expect(response.body.contact.id).toBeDefined();

    const savedContact = await prisma.contactMessage.findUnique({
      where: { id: response.body.contact.id },
    });

    expect(savedContact).not.toBeNull();
    expect(savedContact.name).toBe("Integration Test");
    expect(savedContact.email).toBe(testEmail);
    expect(savedContact.message).toBe(testMessage);
  });
});
