Task List App

This project is a simple task list application developed using React for the front end and Express.js with Sequelize ORM for the back end.

Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

1. Clone the repository:

   git clone https://github.com/Bacusmon/program-challenge

2. Navigate to the server folder:

  cd task-list-server

3. Install dependencies:

  npm install

4. Open another terminal and navigate to the app folder:

  cd task-list-app

5. Install dependencies for the React app:

  npm install

6. Export the database file:

  - Locate the tasklistdb.sql file in the database folder.
  - Import this SQL file into your MySQL database.

7. Run the application:

  - In one terminal, start the server:
    npm start
    
  - In another terminal, start the React app:
    npm start

8. Open your browser and go to http://localhost:3000 to view the app.

## Testing

Note: Ensure that the server and React app are not running during testing.

1. To run tests for the server:

    cd task-list-server
    npm test

This will execute the server tests using Chai for assertions, Sinon for spies, stubs, and mocks, and Mocha as the test framework.

Note: Ensure that you have a running MySQL database with the correct configurations.
