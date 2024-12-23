import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('DLSU Admin API')
    .setDescription('API for DLSU Admin')
    .setVersion('1.0')
    .addTag('DLSU Admin')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const guard = app.get(JwtAuthGuard);
  app.useGlobalGuards(guard);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
