import { Column, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @CreateDateColumn({
        type: 'datetime',
        name: 'CREATED_AT',
        comment: '등록일시',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({ name: 'CREATED_BY', type: 'varchar', length: 30, default: '', nullable: false, comment: '등록자' })
    createdBy: string;

    @Column({ name: 'CREATED_IP', type: 'varchar', length: 30, default: '', comment: '생성IP' })
    createdIp: string;

    @CreateDateColumn({
        type: 'datetime',
        name: 'UPDATED_AT',
        comment: '수정일시',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date | null;

    @Column({ name: 'UPDATED_BY', type: 'varchar', length: 30, nullable: true, comment: '수정자' })
    updatedBy: string | null;

    @Column({ name: 'UPDATED_IP', type: 'varchar', length: 30, nullable: true, comment: '수정IP' })
    updatedIp: string | null;
}
