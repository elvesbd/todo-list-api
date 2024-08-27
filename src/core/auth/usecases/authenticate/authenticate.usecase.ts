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
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(input: Input): Promise<Output> {
    const { email, password } = input;
    console.log({ email, password });

    const user = await this.userRepository.getByEmail(email);
    console.log({ user });

    if (!user || user.password !== password)
      throw new UnauthorizedException('Invalid credentials!');

    const payload = {
      sub: String(user.id),
    };
    const accessToken = await this.tokenManager.signAsync(payload);

    return { accessToken };
  }
}
