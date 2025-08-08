import {IsDate, IsOptional, IsString} from "class-validator";
import {AuthSms} from "../entities/auth-sms.entity";

export class CreateAuthSmsDTO{
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    authNum: string;

    @IsOptional()
    @IsDate()
    expiresAt: Date;

    @IsOptional()
    @IsString()
    createdIp: string;

    private generateAuthNum(length = 6): string {
        let authNum = '';
        for (let i = 0; i < length; i++) {
            const tmp = Math.floor(Math.random() * 10); // 0~9 사이 정수
            authNum += tmp.toString();
        }
        return authNum;
    }

    toEntity(): AuthSms {
        const entity = new AuthSms();
        entity.phoneNumber = this.phoneNumber;
        entity.authNum = this.generateAuthNum();
        entity.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        entity.createdIp = this.createdIp;
        return entity;
    }
}
