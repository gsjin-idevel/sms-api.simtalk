import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthSms} from "./entities/auth-sms.entity";
import {BizMsg} from "./entities/biz-msg.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthSms], 'dbsimtalk'),  // 반드시 연결 이름 명시
    TypeOrmModule.forFeature([BizMsg], 'dbwtest'),
  ],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
