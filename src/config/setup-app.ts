import { INestApplication } from '@nestjs/common';

export const setupApp = (app: INestApplication): INestApplication => {
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Access',
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
  });

  return app;
};
