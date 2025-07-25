import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import Bug from "../models/Bug.js";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe("Bug API Routes", () => {
  it("should create a new bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Test Bug", description: "Bug description" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Bug");
  });

  it("should get all bugs", async () => {
    await Bug.create({ title: "Bug 1" });
    const res = await request(app).get("/api/bugs");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a bug", async () => {
    const bug = await Bug.create({ title: "Update Me" });
    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: "resolved" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("resolved");
  });

  it("should delete a bug", async () => {
    const bug = await Bug.create({ title: "Delete Me" });
    const res = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(res.status).toBe(204);
  });
});
