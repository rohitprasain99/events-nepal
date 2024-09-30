import { Event } from 'src/event/entities/event.entity';
import { Users } from 'src/user/entities/user.entity';
import { StatusEnum } from 'src/utils/enums/status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('organizers')
export class Organizer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  organizer_name: string;

  @Column()
  contact_number: number;

  @Column()
  ceo_name: string;

  @Column()
  pan_number: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @OneToOne(() => Users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  users: Users;

  @OneToMany(() => Event, (event) => event.organizer)
  event: Event[];
}

/*
JoinColumn is required only for one-to-one relation
*/
