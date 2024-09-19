import { GenericEntity } from 'src/core/common/generic.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;
}
