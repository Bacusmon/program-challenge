const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../index');
const { expect } = chai;
const { Users, Task } = require('../models');

chai.use(chaiHttp);

let authToken;

describe('Server API Tests', () => {
  let server;

  // Stub token verification
  const validateTokenStub = sinon.stub(require('../middlewares/AuthMiddleware'), 'validateToken');

  // Stub database operations
  const usersCreateStub = sinon.stub(Users, 'create');
  const taskCreateStub = sinon.stub(Task, 'create');

  // Run before any test cases
  before(async () => {
    try {
      // Log in the user and store the token in the shared variable
      const loginRes = await chai
        .request(app)
        .post('/users/login')
        .send({ username: 'testuser', password: 'testpassword' });

      authToken = loginRes.body.token;

      // Start the server
      server = app.listen(3002, () => {
        console.log('Server started on port 3002');
      });
    } catch (error) {
      console.error('Error setting up tests:', error);
      throw error;
    }
  });

  // Run after all test cases
  after(() => {
    // Restore stubs after all tests are done
    validateTokenStub.restore();
    usersCreateStub.restore();
    taskCreateStub.restore();

    // Cleanup (close server, close database connections, etc.)
    server.close(() => {
      console.log('Server closed');
    });
  });

  // Test user signup
  it('should sign up a new user', async () => {
    // Stub the Users.create method to avoid actual database operations
    usersCreateStub.resolves();

    try {
      const res = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'test@example.com',
          username: 'testuser',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.text).to.equal('"SUCCESS"');
      // Assert that the Users.create method was called with the correct arguments
      expect(usersCreateStub.calledOnce).to.be.true;
    } catch (error) {
      console.error('Error testing user signup:', error);
      throw error;
    }
  });

  // Test user login
  it('should log in a user', async () => {
    // Stub the Users.findOne and bcrypt.compare methods
    sinon.stub(Users, 'findOne').resolves({
      id: 1,
      username: 'testuser',
      password: '$2b$10$SomeHash',
    });
    sinon.stub(require('bcrypt'), 'compare').resolves(true);

    try {
      const res = await chai
        .request(app)
        .post('/users/login')
        .send({ username: 'testuser', password: 'testpassword' });

      authToken = res.body.token;

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    } catch (error) {
      console.error('Error testing user login:', error);
      throw error;
    }
  });

  // Test GET endpoint for tasks
  it('should get a list of tasks', async () => {
    // Stub the Task.findAll method to avoid actual database operations
    sinon.stub(Task, 'findAll').resolves([]);

    try {
      const res = await chai.request(app).get('/task');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    } catch (error) {
      console.error('Error testing GET endpoint for tasks:', error);
      throw error;
    }
  });

// Test POST endpoint for tasks
it('should create a new task', async () => {
  try {
    const res = await chai
      .request(app)
      .post('/task')
      .set('accessToken', authToken)
      .send({
        title: 'Test Task',
        description: 'Testing',
        dateTime: '2023-12-01T12:00:00',
      });

    console.log('Response:', res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    
    // Add logging to see the number of calls to Task.create
    console.log('Number of calls to Task.create:', taskCreateStub.callCount);

    // Assert that the Task.create method was called with the correct arguments
    expect(taskCreateStub.calledOnce).to.be.true;
  } catch (error) {
    console.error('Error testing POST endpoint for tasks:', error);
    throw error;
  }
});

  // Test DELETE endpoint for tasks
it('should delete a task', async () => {
  try {
    // Assuming there is a task ID available for deletion
    const taskIdToDelete = 1;

    const res = await chai
      .request(app)
      .delete(`/task/${taskIdToDelete}`)
      .set('accessToken', authToken);

    console.log('Delete Task Response:', res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.equal('DELETED SUCCESSFULLY');
  } catch (error) {
    console.error('Error testing DELETE endpoint for tasks:', error);
    throw error;
  }
});
  
// Test GET endpoint for authenticated user information
it('should get authenticated user information', async () => {
  try {
    const res = await chai
      .request(app)
      .get('/users/auth')
      .set('accessToken', authToken);

    console.log('Authenticated User Info Response:', res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    // Add more assertions based on the expected user information
  } catch (error) {
    console.error('Error testing GET endpoint for authenticated user information:', error);
    throw error;
  }
});

});
