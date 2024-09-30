import { Exclude } from 'class-transformer';
import { GenericEntity } from 'src/core/common/generic.entity';
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

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ADMIN,
  })
  role: RoleEnum;
}
