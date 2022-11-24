import { createUserService } from '../../../services/user/user.service';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { loginService } from '../../../services/session/session.service';
import { AppError } from '../../../errors/appError';

// Teste unitário
describe('Login', () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then(res => (connection = res))
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('Checks if an exception is thrown when an username is invalid', async () => {
    // Create an user
    const userData = {
      username: 'jose',
      password: '1234',
    };

    await createUserService(userData);

    const userData2 = {
      username: 'bruna',
      password: '1234',
    };

    // Checks if the username entered is valid
    await expect(loginService(userData2)).rejects.toBeInstanceOf(AppError);
    await expect(loginService(userData2)).rejects.toThrow(
      /^Invalid Credentials$/,
    );
  });

  test('Checks if an exception is thrown when a password is invalid', async () => {
    // Create an user
    const userData = {
      username: 'jose',
      password: '1234',
    };

    await createUserService(userData);

    const userData2 = {
      username: 'jose',
      password: 'abcd',
    };

    await expect(loginService(userData2)).rejects.toBeInstanceOf(AppError);
    await expect(loginService(userData2)).rejects.toThrow(
      /^Invalid Credentials$/,
    );
  });

  test('Checks if a token is returned, when login is successful', async () => {
    // Create an user
    const userData = {
      username: 'jose',
      password: '1234',
    };

    await createUserService(userData);

    const response = await loginService(userData);

    expect(response).toHaveProperty('token');
  });
});
