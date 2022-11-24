import { Account } from './account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => Account, account => account.user)
  @JoinColumn()
  account: Account;
}
