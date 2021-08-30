import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';
import { AppClusterService } from './app-cluster/app-cluster.service';

if (process.env.NODE_ENV === 'development') {
  // console.log("In development mode");
  const envConfig = dotenv.parse(
    fs.readFileSync(path.resolve(__dirname, '../.dev-env')),
  );
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  // console.log("In production mode");
  dotenv.config();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Football')
    .setDescription('Football team manager')
    .setVersion('1.0')
    .addTag('Football')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}

console.log(`CLUSTER: ${process.env.CLUSTER}`);
console.log(typeof process.env.CLUSTER);
if (process.env.CLUSTER === 'true') {
  console.log('starting cluster');
  AppClusterService.clusterize(bootstrap);
} else {
  console.log('Starting without cluster');
  bootstrap();
}
