# Web_spiders-_India-Task-Manager-Mongodb
This is a Task Manager API built with Node.js, Express, and MongoDB. The API allows users to register, log in, and manage tasks with functionalities like creating, retrieving, updating, soft-deleting, and restoring tasks. JWT-based authentication is used to secure the API.

### Table of Contents
- Project Setup
- Unit Test using Jest and superst
- API Base URL
- POSTMAN Collection
- Authentication
- API Structure
- Design Decisions
- User Routes
  - Register
  - Login
- Task Routes
  - Create Task
  - Get User Tasks
  - Get Single Task
  - Update Task
  - Delete Task (Soft Delete)
  - Restore Task
- Error Handling
- Test Cases

### Steps to Set Up:
1. Clone the repository.
2. Run ```npm install``` to install dependencies.
3. Start the server with ```npm start```.

### To Run Unit Test in test file:
- Run ```npm run test``` in terminal [without starting the server]

# API Base URL
All API endpoints can be accessed at the following base URL:

https://web-spiders-india-task-manager-mongodb.onrender.com

# Visit below link for POSTMAN COLLECTION
[Click here to view Postman Collection](https://webspiders.postman.co/workspace/WebSpiders-Workspace~21ec1a32-dbce-4085-9338-2547476cf2ed/collection/22131487-007a1c3f-ea8c-447e-b1aa-3257d8e542d3?action=share&creator=22131487)
**Right-click on the link and select "Open in new tab" to view in a new tab.**

### Packages Used:
- **express:** The web framework for building the API.
- **mongoose:** MongoDB ORM to interact with MongoDB in a structured way.
- **jsonwebtoken:** To issue and verify JWT tokens for authentication.
- **bcrypt:** For password hashing and verification.
- **dotenv:** For environment variable management.
- **joi:** For input validation using schemas.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **nodemon** (optional for development): Automatically restarts the server on file changes.


# Authentication
JWT-based authentication is required for all task-related operations. Upon successful login, a JWT token is returned and should be included in the Authorization header as a Bearer token for subsequent requests to protected routes.

## API Structure:
The application is split into several key sections, ensuring modularity and maintainability:

#### Models:
- **User.js:** Defines the schema for a user, including username, email, and password (hashed).
- Task.js: Defines the schema for tasks, with fields like title, description, status, and priority.
#### Controllers:
- **userControllers.js:** Handles user registration and login.
- **taskControllers.js:** Handles task-related operations like creating, updating, deleting, and querying tasks.
#### Routes:
- **userRoutes.js:** Routes for user authentication (login and register).
- **taskRoutes.js:** Routes for task management, such as creating, updating, and deleting tasks.
#### Middlewares:
- **authenticateToken.js:** Middleware for verifying JWT tokens and securing routes.
- **errorHandler.js:** Custom error handling middleware.
- **joiInputValidater.js:** Middleware for input validation using Joi.
#### Database:
MongoDB is used for storage. The Mongoose library is used to model and query the data.

## Design Decisions:
1. **Modular Structure:** The project is divided into clear modules (models, controllers, routes, middlewares) to keep the code clean and maintainable.
2. **JWT Authentication:** JWT is used to securely authenticate users and manage sessions. After logging in, users receive a JWT which is used to access protected routes (e.g., managing tasks).
3. **Soft Deletion:** Tasks are soft-deleted by setting an isDeleted field to true. This allows for easy restoration of tasks if needed.
4. **Validation:**
  - **Joi** is used to validate request inputs to ensure that only valid data is processed, providing better security and reducing errors.
Custom error messages are provided in the validation to improve user experience and debugging.
  - **Pagination and Sorting for Tasks:** The tasks are paginated (2 tasks per page by default), and sorting is supported by fields like createdAt and dueDate. This helps in efficiently querying large datasets.
5. **Separation of Concerns:**
  - Controllers handle the business logic (task creation, updating, etc.).
  - Routes handle the HTTP request routing.
  - Middlewares handle additional logic (authentication, validation, etc.).

## User Routes
### POST /users/register
Registers a new user.
#### Request body:
```
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "securepassword"
}
```
#### Response:
```
{
  "message": "User Created Successfully"
}
```
### POST /users/login
Logs in an existing user and returns a JWT token.

#### Request body:
```
{
  "username": "user123",
  "password": "securepassword"
}
```
#### Response:
```
{
  "jwt_token": "your_jwt_token_here",
  "message": "Logged in successfully"
}
```

## Task Routes
### POST /tasks
Creates a new task for the authenticated user.
#### Request body:
```
{
  "title": "Task 1",
  "description": "Description of task 1",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-12-10T00:00:00.000Z"
}
```
#### Response:
```
{
  "task": { ...taskData },
  "message": "Task Created Successfully"
}
```

### GET /tasks
Fetches a list of tasks for the authenticated user with optional filters (status, priority, sorting, pagination).

#### Query Parameters:

- **status** (optional): Filter by task status (TODO, IN_PROGRESS, COMPLETED)
- **priority** (optional): Filter by task priority (LOW, MEDIUM, HIGH)
- **sort** (optional): Sort by field (createdAt, dueDate)
- **page** (optional): Pagination page number


#### Response:
```
{
  "tasks": [ ...tasks ],
  "count": 2,
  "message": "Tasks Fetched Successfully"
}
```
### GET /tasks/:id
Fetches a specific task by its ID for the authenticated user.

#### Response:
```
{
  "task": { ...taskData }
}
```
### PUT /tasks/:id
Updates an existing task for the authenticated user.
#### Request body:
```
{
  "title": "Updated Task Title",
  "description": "Updated task description",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```
#### Response:
```
{
  "task": { ...updatedTaskData },
  "message": "Updated the task successfully"
}
```
### DELETE /tasks/:id
Soft deletes a task for the authenticated user by setting the isDeleted field to true.
#### Response:
```
{
  "message": "Updated the task successfully"
}
```
### PATCH /tasks/:id
Restores a soft-deleted task for the authenticated user by setting the isDeleted field to false.
#### Response:
```
{
  "task": { ...restoredTaskData },
  "message": "Restored the task successfully"
}
```
### Error Handling
Custom error handling is implemented throughout the API. Errors are caught by middlewares and the response is standardized with HTTP status codes and error messages. Common errors include:

- **400**: Bad Request (e.g., validation errors)
- **401**: Unauthorized (e.g., invalid JWT token)
- **404**: Not Found (e.g., task/user does not exist)
- **500**: Internal Server Error (e.g., database connectivity issues)

### Test Cases
## User Registration
1. **Test case:** Successful registration with valid inputs.
- **Input:** Valid username, email, password.
- **Expected Output:** "message": "User Created Successfully"
  
2. **Test case:** Register with existing username.
- **Input:** username: "existingUser", email: "new@example.com".
- **Expected Output:** "error": "User already exists"

3. **Test case:** Register with existing email.
- **Input:** username: "username", email: "new@example.com".
- **Expected Output:** "error": "email already exists"

### User Login
1. **Test case:** Successful login with valid credentials.
- **Input:** username: "user123", password: "securepassword".
- **Expected Output:** "jwt_token": "your_jwt_token_here", "message": "Logged in successfully"

2. Test case: Login with incorrect password.
- **Input:** username: "user123", password: "wrongpassword".
- **Expected Output:** "error": "Invalid password"

### Task Management
1. **Test case:** Create task with valid data.
- **Input:** title, description, status, priority, dueDate.
- **Expected Output:** "message": "Task Created Successfully", task data.

2. **Test case:** Fetch tasks with query parameters.
- **Input:** status: "TODO", priority: "HIGH", page: 1.
- **Expected Output:** Tasks filtered based on query parameters.

3. **Test case:** Attempt to update a task without permissions.
- **Input:** Task ID of another user.
- **Expected Output:** "error": "Task not found or not authorized"

4. **Test case:** Attempt to delete a task doesn't exist.
- **Input:** Task Id of task doesn't exist.
- **Expected Output:** "error": "Task your trying to Delete is not exits"

5. **Test case:** Attempt to delete a task already deleted.
- **Input:** Task Id of deleted task.
- **Expected Output:** "error": "Task your trying to Delete is already Deleted"

6. **Test case:** Attempt to restore a task doesn't exist.
- **Input:** Task Id of task doesn't exist.
- **Expected Output:** "error": "Task your trying to restore is not exits"

7. **Test case:** Attempt to delete a task not deleted.
- **Input:** Task Id of existing task.
- **Expected Output:** "error": "Task your trying to retore is not Deleted"

### Reference:
mongoose documentation, joi-: joi documentation, dev.to,Medium.com,GeeksforGeeks, Unit test using Jest and supertest: freecodecamp.org,
google, chatgpt: assistance for readme file content based on my code, unexpected errors, idea for custom Error constructor for thorwing error with statuscode,youtube: geegsforgeeks,and etc...
