import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  readonly id: number;

  @CreateDateColumn({ type: 'text', comment: '생성일' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'text', comment: '수정일' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'text', comment: '삭제일' })
  deletedAt?: Date | null;
}
