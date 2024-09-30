import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('lecture_session_status')
export class LectureSessionStatus {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
