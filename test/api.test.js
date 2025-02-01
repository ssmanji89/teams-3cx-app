const request = require("supertest");
const app = require("../backend/index");

describe("3CX API Endpoints", () => {
  it("should return user extension info", async () => {
    const userId = "user1";
    const response = await request(app).get(`/api/user-extension/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("extension", "101");
    expect(response.body).toHaveProperty("displayName");
  });

  it("should initiate a call", async () => {
    const response = await request(app)
      .post("/api/call")
      .send({ from: "Alice", to: "Bob" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "initiated");
    expect(response.body).toHaveProperty("callId");
  });

  it("should return call status", async () => {
    const callId = "test123";
    const response = await request(app).get(`/api/call-status/${callId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("callId", callId);
    expect(response.body).toHaveProperty("status", "active");
    expect(response.body.logs).toBeInstanceOf(Array);
  });

  it("should perform a call control action", async () => {
    const response = await request(app)
      .post("/api/call-control")
      .send({ callId: "abc123", action: "hold" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("callId", "abc123");
    expect(response.body).toHaveProperty("action", "hold");
    expect(response.body).toHaveProperty("status", "success");
  });
});
