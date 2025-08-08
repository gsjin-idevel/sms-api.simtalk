import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UpdateAuthSmsDTO} from './dto/update-auth-sms.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {AuthSms} from "./entities/auth-sms.entity";
import {Repository, UpdateResult} from "typeorm";
import {BizMsg} from "./entities/biz-msg.entity";
import {CreateBizMsgDTO} from "./dto/create-biz-msg.dto";
import {CreateAuthSmsDTO} from "./dto/create-auth-sms.dto";
import {ResponseMessages} from "../common/enums/reponse-messages";

@Injectable()
export class SmsService {
  constructor(
      @InjectRepository(AuthSms, 'dbsimtalk')
      private readonly authSmsRepository: Repository<AuthSms>,
      @InjectRepository(BizMsg, 'dbwtest')
      private readonly bizMsgRepository: Repository<BizMsg>
  ) {}

  async createBizMsg(createBizMsgDTO: CreateBizMsgDTO, authNum: string): Promise<BizMsg> {
    const entity = createBizMsgDTO.toEntity(authNum);
    return await this.bizMsgRepository.save(entity);
  }

  async createAuthSms(createAuthSmsDTO: CreateAuthSmsDTO): Promise<AuthSms> {
    const entity = createAuthSmsDTO.toEntity();
    return await this.authSmsRepository.save(entity);
  }

  async send(createAuthSmsDTO: CreateAuthSmsDTO): Promise<AuthSms> {
    const created = await this.createAuthSms(createAuthSmsDTO);
    const createBizMsgDTO = new CreateBizMsgDTO();
    createBizMsgDTO.destPhone = created.phoneNumber;
    await this.createBizMsg(createBizMsgDTO, created.authNum);

    return created;
  }

  async verify(updateAuthSmsDTO: UpdateAuthSmsDTO) {
    const entity = await this.findOneByPhoneNumber(updateAuthSmsDTO.phoneNumber);

    if (!entity || updateAuthSmsDTO.authNum !== entity.authNum) {
      throw new HttpException(
          ResponseMessages.AUTH_NUM_VERIFY_FAIL,
          HttpStatus.BAD_REQUEST
      );
    }

    if(new Date() > entity.expiresAt){
      throw new HttpException(
          ResponseMessages.AUTH_NUM_EXPIRED,
          HttpStatus.GONE
      );
    }

    return await this.updateAuthSms(updateAuthSmsDTO);
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<AuthSms | null> {
    return await this.authSmsRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
        authYn: 'N'
      },
      order: {
        seq: 'DESC',
      },
    });
  }

  async updateAuthSms(updateAuthSmsDTO: UpdateAuthSmsDTO): Promise<UpdateResult> {
    const entity = updateAuthSmsDTO.toEntity();
    return await this.authSmsRepository.update(
        {
          phoneNumber: entity.phoneNumber,
          authNum: entity.authNum
        }, // AND 조건
        {
          authYn: entity.authYn,
          updatedAt: new Date(),
          updatedIp: entity.updatedIp
        } // 변경할 값
    );
  }

}
