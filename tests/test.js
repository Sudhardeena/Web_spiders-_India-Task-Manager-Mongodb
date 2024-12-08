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


//Successs scenario for Get all User Tasks
describe("GET /tasks", () => {
    it("should return all tasks 200 with filtering, sorting, pagination", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .get("/tasks?status=IN_PROGRESS&priority=MEDIUM&sort=dueDate&page=1")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
  });

  //Failure scenario for Get all user with invalid query parameters
  describe("GET /tasks", () => {
    it("should throw error 400 with invalid filtering, sorting, pagination", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .get("/tasks?status=INVALID&priority=INVALID&sort=INVALID&page=INVALID")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
    });
  });

  //Success secenrio fro Get Single Task
//   describe("GET /tasks/:id", () => {
//     it("should retun 201 with created task", async () => {

//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
//         const res = await request(app)
//         .get("/tasks/675445e2a133992bb34ae03c")
//         .set("Authorization", `Bearer ${token}`);
//         expect(res.statusCode).toBe(200);
//     });
//   });

  //Failure secenrio fro Get Single Task with invalid task Id
  describe("GET /tasks/:id", () => {
    it("should throw 404 for Updating task with invalid task Id", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .get("/tasks/605445e2a133992bb34ae03c")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
  });

  //Sucess scenario for Creating Task
  describe("POST /tasks", () => {
    it("should create a task", async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
      const res = await request(app).post("/tasks").send({
        "title": "new",
        "description": "this is new task",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "dueDate": "2024-12-07"
      }).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(201);
    });
  });

  //Failure scenario for Creating Task with title is missed, invalid values fields
  describe("POST /tasks", () => {
    it("should throw error 400 for create a task", async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
      const res = await request(app).post("/tasks").send({
        "description": "",
        "status": "INVALID",
        "priority": "INVALID",
        "dueDate": "INVALID"
      }).set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
    });
  });

//Success secenrio for Get Single Task
//   describe("PUT /tasks/:id", () => {
//     it("should return 201 for Updated task", async () => {

//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
//         const res = await request(app)
//         .put("/tasks/675445e2a133992bb34ae03c").send({
//             "title": "UPDATED task32",
//             "description": "this is task32",
//             "status": "COMPLETED",
//             "priority": "LOW",
//             "dueDate": "2024-12-09"
//           })
//         .set("Authorization", `Bearer ${token}`);
//         expect(res.statusCode).toBe(201);
//     });
//   });

//Failure secenario for invalid task id Get Single Task
  describe("PUT /tasks/:id", () => {
    it("should return 404 for Updated task", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .put("/tasks/605445e2a133992bb34ae03c").send({
            "title": "UPDATED task32",
            "description": "this is task32",
            "status": "COMPLETED",
            "priority": "LOW",
            "dueDate": "2024-12-09"
          })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
  });


//Sucess secenrio for Deleting Single Task task Id
// describe("DELETE /tasks/:id", () => {
//     it("should return 204 for Deleted task", async () => {

//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
//         const res = await request(app)
//         .delete("/tasks/605445e2a133992bb34ae03c")
//         .set("Authorization", `Bearer ${token}`);
//         expect(res.statusCode).toBe(204);
//     });
//   });

//Failure secenrio for Deleting Single Task with invalid task Id
describe("DELETE /tasks/:id", () => {
    it("should throw 404 for Deleting task with invalid task Id", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .delete("/tasks/605445e2a133992bb34ae03c")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
  });

//Sucess secenrio for Restoring Deleted Task with task Id
// describe("PATCH /tasks/:id", () => {
//     it("should return 201 for Restored task", async () => {

//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
//         const res = await request(app)
//         .patch("/tasks/605445e2a133992bb34ae03c")
//         .set("Authorization", `Bearer ${token}`);
//         expect(res.statusCode).toBe(201);
//     });
//   });


//Failure secenrio for Restoring Deleted Task with invalid task Id
describe("PATCH /tasks/:id", () => {
    it("should throw 404 for Restoring task with invalid task Id", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzOGViYmQ0NTZhOGE1YWE1ZmJhM2IiLCJpYXQiOjE3MzM1NjQzNDh9.3IkL8JAnjbhN-ylquziRD9Gc00AJNLG2qV6t6O18PdE";
        
        const res = await request(app)
        .patch("/tasks/605445e2a133992bb34ae03c")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
  });