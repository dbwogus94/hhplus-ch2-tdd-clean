import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LectureSessionEntity } from '../lecture-session.entity';

@Entity('lecture_session_status')
export class LectureSessionStatusEntity {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => LectureSessionEntity, (session) => session.status)
  lectureSessions: LectureSessionEntity[];
}
