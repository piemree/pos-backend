import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  companyName!: string;

  @Column({ default: () => 0 })
  balance!: number;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @ManyToOne(() => User, (users) => users.customers)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions!: Transaction[];
}
