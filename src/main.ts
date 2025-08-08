import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AllExceptionsFilter} from "./common/filters/custom-exception-fliter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사 파이프
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, }));
  // 글로벌 예외 필터 등록
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
