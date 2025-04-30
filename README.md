# Post Management Blog Backend API

## Description

This is a Node.js + Express backend API for a simple blog platform that handles:
- User Authentication (JWT)
- CRUD operations for Posts, Comments, and Tags
- Role-based Access Control (Author / Admin)
- Pagination for posts and comments
- Protected Routes using Middleware

---

## Technology Stack

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment management

---

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/blog-backend.git
cd blog-backend

## Testing API ROUTES
Auth Route

| Method | Endpoint           | Description              |
| ------ | ----------------   |  ----------------------- |
| POST   | /api/auth/register | Register a new user      |
| POST   | /api/auth/login    | Login a user             |

Post Route

| Method | Endpoint          | Description                   |
| ------ | ----------------  | -----------------------       |
| POST   | /api/posts        | Create a new post (protected) |
| GET    | /api/posts        | Get all posts                 |
| GET    | /api/posts/:id    | Get a specific post           |
| PUT    | /api/posts/:id    | Update a post (protected)     |
| DELETE | /api/posts/:id    | Delete a post (protected)     |


Comments Route

| Method | Endpoint              | Description              |
| ------ | ----------------      | -----------------------  |
| POST   | /api/comments         | Add a comment (protected)|
| GET    | /api/comments/:postId | Get comments for a post  |

Tag Route

| Method | Endpoint          | Description                   |
| ------ | ----------------  | -----------------------       |
| POST   | /api/tags         | Create a new tag (admin only) |
| GET    | /api/tags         | Get all tags                  |