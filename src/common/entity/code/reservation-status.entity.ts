import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReservationEntity } from '../reservation.entity';

@Entity('reservation_status')
export class ReservationStatusEntity {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.status)
  reservations: ReservationEntity[];
}
