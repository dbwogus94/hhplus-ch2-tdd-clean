import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { LectureSession } from './lecture-session.entity';

@Entity('lecture')
export class Lecture extends BaseEntity {
  @Column('varchar', { comment: '특강 이름' })
  name: string;

  @Column('varchar', { comment: '강연자 이름' })
  lecturerName: string;

  @Column('int', { comment: '특강 최대 정원' })
  maxCapacity: number;

  /* ======================= 연관관계 ======================= */
  @OneToMany(() => LectureSession, (session) => session.lecture)
  sessions: LectureSession[];
}
