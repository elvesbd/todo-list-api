import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenManager } from '@core/auth/ports';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, JWTService } from '@infra/providers/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        //signOptions: { expiresIn: '360s' },
      }),
    }),
  ],
  providers: [
    JwtStrategy,

    {
      provide: TokenManager,
      useClass: JWTService,
    },
  ],
  exports: [JwtStrategy, TokenManager],
})
export class ProviderModule {}
