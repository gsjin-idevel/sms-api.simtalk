import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {SmsModule} from "./sms/sms.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
      //심톡 개발DB 연동
    TypeOrmModule.forRoot({
      name: 'dbsimtalk',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
      //BIZ뿌리오 DB연동
    TypeOrmModule.forRoot({
      name: 'dbwtest',
      type: 'mysql',
      host: process.env.BIZ_DB_HOST,
      port: parseInt(process.env.BIZ_DB_PORT ?? '3306', 10),
      username: process.env.BIZ_DB_USERNAME,
      password: process.env.BIZ_DB_PASSWORD,
      database: process.env.BIZ_DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
