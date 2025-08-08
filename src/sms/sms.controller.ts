import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req} from '@nestjs/common';
import {SmsService} from './sms.service';
import {UpdateSmDto} from './dto/update-sm.dto';
import {CreateAuthSmsDTO} from "./dto/create-auth-sms.dto";
import {ApiResponse} from "../common/dto/api-response.dto";
import {ResponseMessages} from "../common/enums/reponse-messages";
import {AuthSms} from "./entities/auth-sms.entity";

@Controller('/auth/sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('/send')
  async send(@Req() req, @Body() createAuthSmsDTO: CreateAuthSmsDTO) {
    const ip: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    if (ip == undefined) return new ApiResponse(false, ResponseMessages.BAD_REQUEST);

    createAuthSmsDTO.createdIp = ip

    const entity = await this.smsService.send(createAuthSmsDTO);
    return new ApiResponse(true, ResponseMessages.AUTH_SMS_SEND_SUCCESS, entity.expiresAt);
  }

  @Get()
  findAll() {
    return this.smsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmDto: UpdateSmDto) {
    return this.smsService.update(+id, updateSmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smsService.remove(+id);
  }
}
