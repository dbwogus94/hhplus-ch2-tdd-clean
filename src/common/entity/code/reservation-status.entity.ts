import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Reservation } from '../reservation.entity';

@Entity('reservation_status')
export class ReservationStatus {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Reservation, (reservation) => reservation.status)
  reservations: Reservation[];
}
