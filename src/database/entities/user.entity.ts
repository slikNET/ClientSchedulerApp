import { Column, Entity, OneToMany } from 'typeorm';

import { UserRole } from '../../modules/user/enum/user.role.enum';
import { AppointmentEntity } from './appointment.entity';
import { ClientEntity } from './client.entity';
import { DefaultEntity } from './common/default.entity';
import { ServiceEntity } from './service.entity';

@Entity('user')
export class UserEntity extends DefaultEntity {
  @Column('text')
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('enum', {
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

  @OneToMany(() => AppointmentEntity, (entity) => entity.user, {
    cascade: true,
  })
  appointments: AppointmentEntity[];

  @OneToMany(() => ServiceEntity, (entity) => entity.user, { cascade: true })
  services: ServiceEntity[];

  @OneToMany(() => ClientEntity, (entity) => entity.user, { cascade: true })
  clients: ClientEntity[];

  @Column('boolean', { default: false })
  activated: boolean;
}
