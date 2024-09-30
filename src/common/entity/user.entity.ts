import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Reservation } from './reservation.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column('character', { comment: '이름' })
  name: string;

  @Column('character', { comment: '전화번호(- 제외)' })
  phone: string;

  @Column('character', { comment: '메일' })
  email: string;

  /* ======================= 연관관계 ======================= */
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
