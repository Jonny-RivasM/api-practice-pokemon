import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 25,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'First name',
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    comment: 'Last name',
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    unique: true,
    comment: 'Identification Number',
  })
  numid: string;

  @Column({ type: 'varchar', length: 80, unique: true, comment: 'Email' })
  email: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
    comment: 'Password',
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    comment: 'Birthdate',
    default: () => 'CURRENT_TIMESTAMP',
  })
  birthdate: Date;

  @Column({
    default: 3,
    type: 'smallint',
    comment: 'Status: 1=Active / 0=Inactive / 3=NotVerify / 4=ForceChangePwd',
  })
  status: number;

  @ManyToMany((type) => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

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

  @DeleteDateColumn()
  deletedAt?: Date;
}
