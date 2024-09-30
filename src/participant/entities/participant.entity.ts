import { Event } from 'src/event/entities/event.entity';
import { ParticipantEnum } from 'src/utils/enums/participant.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  nationality: string;

  @Column()
  contact_no: number;

  @Column({
    type: 'enum',
    enum: ParticipantEnum,
    default: ParticipantEnum.PENDING,
  })
  status: string;

  @ManyToOne(() => Event, (event) => event.participant)
  event: Event;
}
