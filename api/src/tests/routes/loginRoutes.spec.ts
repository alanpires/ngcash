import { DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';
import app from '../../app';
import request from 'supertest';

//Teste de integração
describe('Testing the login routes', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(res => (connection = res))
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Must login user', async () => {
    // Create an user
    const username = 'jose';
    const password = '12345678A';

    const userData = { username, password };

    await request(app).post('/create').send(userData);

    // Login user
    const response = await request(app).post('/login').send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Should fail if user enters an invalid username', async () => {
    // Create an user
    const username = 'jose';
    const password = '12345678A';

    const userData = { username, password };

    await request(app).post('/create').send(userData);

    // Login user
    const response = await request(app)
      .post('/login')
      .send({ username: 'carla', password });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      status: 'error',
      message: 'Invalid Credentials',
    });
  });

  test('Should fail if user enters an invalid password', async () => {
    // Create an user
    const username = 'jose';
    const password = '12345678A';

    const userData = { username, password };

    await request(app).post('/create').send(userData);

    // Login user
    const response = await request(app)
      .post('/login')
      .send({ username, password: '1234' });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      status: 'error',
      message: 'Invalid Credentials',
    });
  });

  test('It should fail to create the user without any information in the request body', async () => {
    const response = await request(app).post('/login').send({});

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: ['username is a required field', 'password is a required field'],
    });
  });
});
