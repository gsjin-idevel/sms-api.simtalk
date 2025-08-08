import {Column, Entity, PrimaryColumn} from "typeorm";
import {BizMsg} from "../entities/biz-msg.entity";
import {MsgBody} from "../enums/msg-body";
import {IsDate, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateBizMsgDTO {
    @IsOptional()
    @IsString()
    cmid: string;

    @IsOptional()
    @IsNumber()
    msgType?: number;

    @IsOptional()
    @IsDate()
    requestTime: Date;

    @IsOptional()
    @IsDate()
    sendTime: Date;

    @IsString()
    destPhone: string;

    @IsOptional()
    @IsString()
    sendPhone: string;

    @IsOptional()
    @IsString()
    msgBody: string;

    private generateCmid(length = 6): string {
        const timestamp = Math.floor(Date.now() / 1000);

        let rand = '';
        for (let i = 0; i < length; i++) {
            const tmp = Math.floor(Math.random() * 10); // 0~9 정수
            rand += tmp.toString();
        }

        return `${timestamp}_${rand}`;
    }

    private formatTemplate(template: string, variables: Record<string, string>): string {
        return template.replace(/{{(\w+)}}/g, (_, key) => variables[key] ?? '');
    }

    toEntity(authNum: string): BizMsg {
        const entity = new BizMsg();
        entity.msgType = 0
        entity.cmid = this.generateCmid();
        entity.requestTime = new Date();
        entity.sendTime = new Date();
        entity.destPhone = this.destPhone;
        entity.sendPhone = '07051029144';
        entity.msgBody = this.formatTemplate(MsgBody.AUTH_NUM, { authNum: authNum });

        return entity;
    }

}