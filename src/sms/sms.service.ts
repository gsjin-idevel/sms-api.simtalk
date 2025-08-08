import { Injectable } from '@nestjs/common';
import { UpdateSmDto } from './dto/update-sm.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {AuthSms} from "./entities/auth-sms.entity";
import {Auth, Repository} from "typeorm";
import {BizMsg} from "./entities/biz-msg.entity";
import {CreateBizMsgDTO} from "./dto/create-biz-msg.dto";
import {CreateAuthSmsDTO} from "./dto/create-auth-sms.dto";

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

  async send(creteAuthSmsDTO: CreateAuthSmsDTO): Promise<AuthSms> {
    const created = await this.createAuthSms(creteAuthSmsDTO);
    const createBizMsgDTO = new CreateBizMsgDTO();
    createBizMsgDTO.destPhone = created.phoneNumber;
    await this.createBizMsg(createBizMsgDTO, created.authNum);

    return created;
  }

  findAll() {
    return `This action returns alBl sms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sm`;
  }

  update(id: number, updateSmDto: UpdateSmDto) {
    return `This action updates a #${id} sm`;
  }

  remove(id: number) {
    return `This action removes a #${id} sm`;
  }

}
