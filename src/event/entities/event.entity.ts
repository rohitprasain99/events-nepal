import { GenericEntity } from 'src/core/common/generic.entity';
import { Organizer } from 'src/organizer/entities/organizer.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Event extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_name: string;

  @Column()
  event_date: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  required_participant_no: number;

  @ManyToOne(() => Organizer, (organizer) => organizer.event)
  organizer: Organizer;

  @OneToMany(() => Participant, (participant) => participant.event)
  participant: Participant[];
}
