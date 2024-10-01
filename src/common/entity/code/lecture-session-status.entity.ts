import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LectureSession } from '../lecture-session.entity';

@Entity('lecture_session_status')
export class LectureSessionStatus {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => LectureSession, (session) => session.status)
  lectureSessions: LectureSession[];
}
