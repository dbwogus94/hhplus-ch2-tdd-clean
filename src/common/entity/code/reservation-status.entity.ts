import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('reservation_status')
export class ReservationStatus {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
