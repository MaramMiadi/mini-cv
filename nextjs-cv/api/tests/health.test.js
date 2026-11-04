const request = require("supertest");
const app = require("../src/server");

describe("GET /api/health", () => {
  it("retourne HTTP 200 et le statut ok", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("devsecops-api");
    expect(response.body.timestamp).toBeDefined();
  });
});
