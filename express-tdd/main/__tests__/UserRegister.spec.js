const User = require('../src/models/User');
const app = require('../src/app');
const request = require('supertest');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

const validUser = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'P4ssword',
};
const postUser = (user = validUser) => {
  return request(app).post('/api/1.0/users').send(user);
};

describe('User registration', () => {
  it('return 200 OK when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });

  it('return success message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created');
  });

  it('saves the user to the database', async () => {
    await postUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('saves the username and email to the database', async () => {
    await postUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@mail.com');
  });

  it('hashes the password before saving it to the database', async () => {
    await postUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });

  it('should return 400 when username is missing', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
    expect(response.status).toBe(400);
  });

  it('returns validationsErrors field in response body when validation error occurs', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
    const validationErrors = response.body.validationErrors;
    expect(validationErrors).not.toBeUndefined();
  });

  it('returns `username is required` when username is missing and validation error occurs', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'P4ssword',
    });
    const validationErrors = response.body.validationErrors;
    expect(validationErrors.username).toBe('username is required');
  });

  it('returns `E-mail is required` when email is missing and validation error occurs', async () => {
    const response = await postUser({
      username: 'user1',
      email: null,
      password: 'P4ssword',
    });
    const validationErrors = response.body.validationErrors;
    expect(validationErrors.email).toBe('E-mail is required');
  });

  it('returns errors when both username and email are missing', async () => {
    const response = await postUser({
      username: null,
      email: null,
      password: 'P4ssword',
    });
    const validationErrors = response.body.validationErrors;
    // Object.keys in this case is working because the obj contains only strings, with numbers it will sort them 👀.
    expect(Object.keys(validationErrors)).toEqual(['username', 'email']);
  });
});
