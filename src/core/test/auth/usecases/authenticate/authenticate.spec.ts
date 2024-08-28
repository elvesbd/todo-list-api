import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@core/auth/model';
import { AuthenticateUseCase } from '@core/auth/usecases';
import { TokenManager, UserRepository } from '@core/auth/ports';

describe('AuthenticateUseCase', () => {
  let sut: AuthenticateUseCase;
  let tokenManager: TokenManager;
  let userRepository: UserRepository;

  const user = User.create({
    email: 'test@mail.com',
    password: 'any_password',
  });

  const input = {
    email: 'test@mail.com',
    password: 'any_password',
  };

  const payload = {
    sub: user.id,
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const UserRepositoryProvider = {
      provide: UserRepository,
      useValue: {
        getByEmail: jest.fn().mockResolvedValue(user),
      },
    };

    const TokenManagerProvider = {
      provide: TokenManager,
      useValue: {
        signAsync: jest.fn().mockResolvedValue('access_token'),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUseCase,
        UserRepositoryProvider,
        TokenManagerProvider,
      ],
    }).compile();

    sut = app.get<AuthenticateUseCase>(AuthenticateUseCase);
    tokenManager = app.get<TokenManager>(TokenManager);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(tokenManager).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call user repository ', async () => {
      await sut.execute(input);

      expect(tokenManager.signAsync).toHaveBeenCalledWith(payload);
      expect(userRepository.getByEmail).toHaveBeenCalledWith(input.email);
    });

    it('should throw an UnauthorizedException if user is not found', async () => {
      jest.spyOn(userRepository, 'getByEmail').mockResolvedValueOnce(null);

      await expect(sut.execute(input)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials!'),
      );
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      const invalidPasswordInput = { ...input, password: 'wrong_password' };

      jest.spyOn(userRepository, 'getByEmail').mockResolvedValueOnce(user);

      await expect(sut.execute(invalidPasswordInput)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials!'),
      );
    });

    it('should return an access token when credentials are valid', async () => {
      const result = await sut.execute(input);

      expect(result).toStrictEqual({ accessToken: 'access_token' });
    });
  });
});
