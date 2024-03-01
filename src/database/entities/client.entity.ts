import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AppointmentEntity } from './appointment.entity';
import { DefaultEntity } from './common/default.entity';
import { UserEntity } from './user.entity';

@Entity('client')
export class ClientEntity extends DefaultEntity {
  @ManyToOne(() => UserEntity, (entity) => entity.clients, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  instagram: string;

  @Column('text', { unique: true, nullable: true })
  phone!: string | null;

  @Column('text', { unique: true, nullable: true })
  telegram!: string | null;

  @Column('text', { unique: true, nullable: true })
  viber!: string | null;

  @OneToMany(() => AppointmentEntity, (entity) => entity.id, { cascade: true })
  appointment: AppointmentEntity[];
}
