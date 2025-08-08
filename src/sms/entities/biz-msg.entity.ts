import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'BIZ_MSG', comment: 'BIZ뿌리오 문자 발송 내역'})
export class BizMsg {
    @PrimaryColumn({ type: 'varchar', length: 32, name: 'CMID', comment: '메시지 ID' })
    cmid: string;

    @Column({ type: 'varchar', length: 32, name: 'UMID', nullable: true, comment: 'UMID' })
    umid?: string;

    @Column({ type: 'int', name: 'MSG_TYPE', default: 0, nullable: true, comment: '메시지 타입' })
    msgType?: number;

    @Column({ type: 'int', name: 'STATUS', default: 0, nullable: true, comment: '상태' })
    status?: number;

    @Column({ type: 'varchar', length: 4, name: 'CALL_STATUS', nullable: true, comment: '콜 상태' })
    callStatus?: string;

    @Column({ type: 'datetime', name: 'REQUEST_TIME', nullable: false, comment: '요청 시간' })
    requestTime: Date;

    @Column({ type: 'datetime', name: 'SEND_TIME', nullable: false, comment: '전송 시간' })
    sendTime: Date;

    @Column({ type: 'datetime', name: 'REPORT_TIME', nullable: true, comment: '보고 시간' })
    reportTime?: Date;

    @Column({ type: 'varchar', length: 16, name: 'DEST_PHONE', nullable: true, comment: '수신 전화번호' })
    destPhone?: string;

    @Column({ type: 'varchar', length: 16, name: 'SEND_PHONE', nullable: true, comment: '발신 전화번호' })
    sendPhone?: string;

    @Column({ type: 'varchar', length: 32, name: 'DEST_NAME', nullable: true, comment: '수신자 이름' })
    destName?: string;

    @Column({ type: 'varchar', length: 32, name: 'SEND_NAME', nullable: true, comment: '발신자 이름' })
    sendName?: string;

    @Column({ type: 'varchar', length: 64, name: 'SUBJECT', nullable: true, comment: '제목' })
    subject?: string;

    @Column({ type: 'varchar', length: 2000, name: 'MSG_BODY', nullable: true, comment: '메시지 본문' })
    msgBody?: string;

    @Column({ type: 'varchar', length: 5, name: 'NATION_CODE', nullable: true, comment: '국가 코드' })
    nationCode?: string;

    @Column({ type: 'varchar', length: 40, name: 'SENDER_KEY', nullable: true, comment: '발신자 키' })
    senderKey?: string;

    @Column({ type: 'varchar', length: 64, name: 'TEMPLATE_CODE', nullable: true, comment: '템플릿 코드' })
    templateCode?: string;

    @Column({ type: 'varchar', length: 8, name: 'RESPONSE_METHOD', nullable: true, comment: '응답 방법' })
    responseMethod?: string;

    @Column({ type: 'int', name: 'TIMEOUT', nullable: true, comment: '타임아웃' })
    timeout?: number;

    @Column({ type: 'varchar', length: 3, name: 'RE_TYPE', default: 'N', nullable: true, comment: '재전송 타입' })
    reType?: string;

    @Column({ type: 'varchar', length: 2000, name: 'RE_BODY', nullable: true, comment: '재전송 본문' })
    reBody?: string;

    @Column({ type: 'varchar', length: 1, name: 'RE_PART', nullable: true, comment: '재전송 부분' })
    rePart?: string;

    @Column({ type: 'int', name: 'COVER_FLAG', default: 0, nullable: true, comment: '커버 플래그' })
    coverFlag?: number;

    @Column({ type: 'int', name: 'SMS_FLAG', default: 0, nullable: true, comment: 'SMS 플래그' })
    smsFlag?: number;

    @Column({ type: 'int', name: 'REPLY_FLAG', default: 0, nullable: true, comment: '답장 플래그' })
    replyFlag?: number;

    @Column({ type: 'int', name: 'RETRY_CNT', nullable: true, comment: '재시도 횟수' })
    retryCnt?: number;

    @Column({ type: 'varchar', length: 1000, name: 'ATTACHED_FILE', nullable: true, comment: '첨부파일' })
    attachedFile?: string;

    @Column({ type: 'varchar', length: 64, name: 'VXML_FILE', nullable: true, comment: 'VXML 파일' })
    vxmlFile?: string;

    @Column({ type: 'int', name: 'USE_PAGE', default: 0, nullable: true, comment: '사용 페이지' })
    usePage?: number;

    @Column({ type: 'int', name: 'USE_TIME', default: 0, nullable: true, comment: '사용 시간' })
    useTime?: number;

    @Column({ type: 'int', name: 'SN_RESULT', default: 0, nullable: true, comment: 'SN 결과' })
    snResult?: number;

    @Column({ type: 'varchar', length: 10, name: 'TEL_INFO', nullable: true, comment: '전화 정보' })
    telInfo?: string;

    @Column({ type: 'varchar', length: 32, name: 'CINFO', nullable: true, comment: 'C 정보' })
    cinfo?: string;

    @Column({ type: 'varchar', length: 30, name: 'USER_KEY', nullable: true, comment: '사용자 키' })
    userKey?: string;

    @Column({ type: 'varchar', length: 1, name: 'AD_FLAG', nullable: true, comment: '광고 플래그' })
    adFlag?: string;

    @Column({ type: 'varchar', length: 32, name: 'RCS_REFKEY', nullable: true, comment: 'RCS 참조키' })
    rcsRefkey?: string;
}
