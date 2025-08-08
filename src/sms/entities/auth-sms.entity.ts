import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../common/entities/base.entity";

@Entity({ name: 'TB_AUTH_SMS', database: 'dbsimtalk',  comment: 'SMS 인증내역 테이블 ' })
@Index('CREATED_AT', ['createdAt'])
@Index('PHONE_NUMBER', ['phoneNumber'])
export class AuthSms extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'SEQ', type: 'int', unsigned: true, comment: '시퀀스' })
    seq: number;

    @Column({ name: 'PHONE_NUMBER', type: 'char', length: 11, default: '', nullable: false, comment: '휴대폰번호' })
    phoneNumber: string;

    @Column({ name: 'AUTH_NUM', type: 'char', length: 6, default: '', nullable: false, comment: '인증번호' })
    authNum: string;

    @Column({
        name: 'AUTH_YN',
        type: 'enum',
        enum: ['Y', 'N'],
        default: 'N',
        nullable: false,
        comment: '인증여부',
    })
    authYn: 'Y' | 'N';

    @Column({ name: 'EXPIRES_AT', type: 'datetime', nullable: true, comment: '인증만료일시' })
    expiresAt: Date;

}
