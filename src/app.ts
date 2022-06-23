/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadGatewayException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import winston from 'winston';

import 'reflect-metadata';
import { middleware } from './app.middleware';
import { AppModule } from './app.module';

// trigger build

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: isProduction
      ? WinstonModule.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/query.log', level: 'query' }),
          new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
          new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.json()),
          }),
        ],
      })
      : undefined,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true, // transform object to DTO class
      exceptionFactory: (validationErrors: ValidationError[] = []) => new BadGatewayException(validationErrors),
    }),
  );
  app.setGlobalPrefix(`api/v${process.env['VERSON'] || '1'}`);
  if (isProduction) {
    app.enable('trust proxy');
  }

  // Express Middleware
  middleware(app);
  await app.listen(process.env.PORT || 3001);
}

console.log('PORT ENV ', process.env.PORT);
// eslint-disable-next-line no-console
bootstrap()
  .then(() => console.log(`Bootstrap on port ${process.env.PORT || 3000}`, new Date().toLocaleString()))
  .catch(console.error);
