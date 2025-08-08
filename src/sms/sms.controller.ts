import {Body, Controller, HttpException, HttpStatus, Post, Req} from '@nestjs/common';
import {SmsService} from './sms.service';
import {CreateAuthSmsDTO} from "./dto/create-auth-sms.dto";
import {ApiResponse} from "../common/dto/api-response.dto";
import {ResponseMessages} from "../common/enums/reponse-messages";
import {UpdateAuthSmsDTO} from "./dto/update-auth-sms.dto";

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

  @Post('/verify')
  async verify(@Req() req, @Body() updateAuthSmsDTO: UpdateAuthSmsDTO) {
    const ip: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    if (ip == undefined) return new ApiResponse(false, ResponseMessages.BAD_REQUEST);

    updateAuthSmsDTO.updatedIp = ip

    const updateResult = await this.smsService.verify(updateAuthSmsDTO);
    if ((updateResult.affected ?? 0) < 1) {
      throw new HttpException(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new ApiResponse(true, ResponseMessages.AUTH_NUM_VERIFY_SUCCESS);
  }

}
