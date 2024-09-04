import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import 'dotenv/config';
import * as compression from 'compression';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Events Nepal API')
    .setDescription('Events Nepal API description')
    .setVersion('1.0')
    .addTag('Events-Nepal')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /*
    protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    collection of smaller middleware functions that set security-related HTTP headers
    provides 11 security related middlewares
  */
  app.use(helmet());

  //mechanism that allows resources to be requested from another domain
  app.enableCors();

  /*
  Compression can greatly decrease the size of 
  the response body, thereby increasing the speed of a web app.
  */
  app.use(compression());

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
