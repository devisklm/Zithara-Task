# Customer Management System
This project is a full-stack web application built with React, Node.js, Express, and PostgreSQL. It allows users to manage customer records with functionalities such as viewing, searching, sorting, and pagination.

## Features
1. Display customer records in a table format.
2. Search customers by name or location.
3. Sort customers by date or time of creation.
4. Paginate through customer records.

# Getting Started
## Prerequisites
. Node.js and npm installed on your machine.
. PostgreSQL database installed and running

# Installation
Clone the repository:
git clone https://github.com/devisklm/Zithara-Task.git
Navigate to the project directory:
cd Task
Install dependencies for the frontend and backend:
# Install frontend dependencies
cd client
npm install
# Install backend dependencies
cd server
npm install
Database Setup
Create a PostgreSQL database named Zithara.
Execute the SQL script located in backend/database.sql to create the customers table.
Optionally, populate the database with dummy data using the provided SQL script.

## Configuration
In the backend directory, create a .env file with the following environment variables:
DB_USER=postgres
DB_PASSWORD=postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=Zithar

## Running the Application
Start the backend server:
cd server
node server.js
In a separate terminal, start the frontend development server:
cd client
npm start
Open your web browser and navigate to http://localhost:3000 to access the application.
