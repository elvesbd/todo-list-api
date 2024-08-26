import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository, TokenManager } from '@core/auth/ports';

type Input = {
  email: string;
  password: string;
};

type Output = {
  accessToken: string;
};

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly tokenManager: TokenManager,
    private readonly todoRepository: UserRepository,
  ) {}

  public async execute(input: Input): Promise<Output> {
    const { email, password } = input;

    const user = await this.todoRepository.getByEmail(email);
    if (!user || user.password !== password)
      throw new UnauthorizedException('Invalid credentials!');

    const payload = {
      sub: String(user.id),
    };
    const accessToken = await this.tokenManager.signAsync(payload);

    return { accessToken };
  }
}
