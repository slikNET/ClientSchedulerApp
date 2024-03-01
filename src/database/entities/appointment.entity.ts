import { Column, Entity, ManyToOne } from 'typeorm';

import { ClientEntity } from './client.entity';
import { DefaultEntity } from './common/default.entity';
import { ServiceEntity } from './service.entity';
import { UserEntity } from './user.entity';

@Entity('appointment')
export class AppointmentEntity extends DefaultEntity {
  @ManyToOne(() => UserEntity, (entity) => entity.username, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column('timestamptz')
  date: Date;

  @Column('interval')
  duration: string;

  @Column('int')
  price: number;

  @ManyToOne(() => ServiceEntity, (entity) => entity.title, {
    eager: true,
    onDelete: 'SET NULL',
  })
  service: ServiceEntity;

  @ManyToOne(() => ClientEntity, (entity) => entity.name, {
    eager: true,
    onDelete: 'SET NULL',
  })
  client: ClientEntity;
}
