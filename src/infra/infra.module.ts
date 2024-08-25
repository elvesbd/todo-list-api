import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/adapters/http.module';

@Module({
  imports: [HttpModule],
})
export class InfraModule {}
