import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Use a name with spaces',
  })
  label: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
    comment: 'Use a name without spaces',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Description role',
  })
  description: string;

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinColumn()
  users: User[];

  @Column({
    default: 1,
    type: 'smallint',
    comment: 'Status: 1=Active / 0=Inactive',
  })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: 'Creation date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: 'Update date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_on: Date;
}
