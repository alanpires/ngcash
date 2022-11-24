import { DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';
import app from '../../app';
import request from 'supertest';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'mockUUID'),
  };
});

//Teste de integração
describe('Testing the account routes', () => {
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

  test('Must return user account', async () => {
    // Create an user
    const username = 'jose';
    const password = '12345678A';

    const userData = { username, password };

    const user = await request(app).post('/create').send(userData);

    // Login user
    const token = await (
      await request(app).post('/login').send(userData)
    ).body.token;

    // List accounts
    const response = await request(app)
      .get('/accounts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('cashIn');
    expect(response.body).toHaveProperty('cashOut');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 'mockUUID',
        balance: 100,
        cashIn: [],
        cashOut: [],
        user: {
          id: 'mockUUID',
          username: user.body.username,
        },
      }),
    );
  });
});
