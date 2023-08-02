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

  @Column({
    nullable: true,
  })
  surname!: string;

  @Column({
    nullable: true,
  })
  companyName!: string;

  @Column({
    nullable: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  address!: string;

  @Column({
    nullable: true,
  })
  iban!: string;

  @Column({
    nullable: true,
  })
  tel!: string;

  @Column({ default: () => 0 })
  balance!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ManyToOne(() => User, (users) => users.customers)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions!: Transaction[];
}
