import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AppointmentEntity } from './appointment.entity';
import { DefaultEntity } from './common/default.entity';
import { UserEntity } from './user.entity';

@Entity('service')
export class ServiceEntity extends DefaultEntity {
  @ManyToOne(() => UserEntity, (entity) => entity.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('interval')
  duration: string;

  @Column('float')
  price: number;

  @Column('varchar', { length: 7, default: '#000' })
  color: string;

  @OneToMany(() => AppointmentEntity, (entity) => entity.id, { cascade: true })
  appointment: AppointmentEntity[];
}
