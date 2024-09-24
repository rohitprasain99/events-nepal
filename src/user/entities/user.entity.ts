import { Exclude } from 'class-transformer';
import { GenericEntity } from 'src/core/common/generic.entity';
import { StatusEnum } from 'src/utils/enums/kyc-status.enum';
import { RoleEnum } from 'src/utils/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ADMIN,
  })
  role: RoleEnum;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: string;

  @Column({ nullable: true })
  refresh_token: string;
}
