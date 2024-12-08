const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../index')

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /tasks", () => {
    it("should return all tasks with filtering, sorting, pagination", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .get("/tasks?status=IN_PROGRESS&priority=MEDIUM&sort=dueDate&page=1")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
  });

  //67538ebbd456a8a5aa5fba3b