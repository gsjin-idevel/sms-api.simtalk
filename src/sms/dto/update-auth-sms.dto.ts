import {IsOptional, IsString} from "class-validator";
import {AuthSms} from "../entities/auth-sms.entity";
import {Expose} from "class-transformer";

export class UpdateAuthSmsDTO {
    @IsString()
    phoneNumber: string;

    @IsString()
    @Expose({ name: 'code' }) // 프론트에서 보내는 code → authNum으로 매핑
    authNum: string;

    @IsOptional()
    @IsString()
    updatedIp: string;

    toEntity(): AuthSms {
        const entity = new AuthSms();
        entity.authYn = 'Y';
        entity.phoneNumber = this.phoneNumber;
        entity.authNum = this.authNum;
        entity.updatedIp = this.updatedIp;
        return entity;
    }
}
