import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export class GenericEntity {
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @Exclude()
  @Column({
    nullable: true,
  })
  created_by: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  updated_by: string;
}
