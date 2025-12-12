# CRUD API Assignment

This project is a simple REST API built using Node.js, Express, and SQLite.
It demonstrates basic CRUD (Create, Read, Update, Delete) operations on a database.

This project does NOT include a frontend website. The API is intended to be tested
using a tool such as Postman, as instructed in the assignment.

## Database

The API uses an SQLite database with one table called `items`.

Table columns:
- id (INTEGER, primary key)
- name (TEXT)
- quantity (INTEGER)

The database file is created automatically when the server starts.

## API Routes

Get all items  
GET /items  

Get a single item by ID  
GET /items/:id  

Create a new item  
POST /items  

Update an existing item  
PUT /items/:id  

Delete an item  
DELETE /items/:id  
