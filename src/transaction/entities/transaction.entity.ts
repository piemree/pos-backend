import { Customers } from 'src/customer/entities/customer.entity';
import { TransactionProduct } from 'src/transaction/entities/transaction-product.entity';
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
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;

  @Column()
  createdAt!: Date;

  @OneToMany(
    () => TransactionProduct,
    (transactionProduct) => transactionProduct.transaction,
  )
  transactionProducts!: TransactionProduct[];

  @ManyToOne(() => Customers, (customers) => customers.transactions)
  @JoinColumn({ name: 'customer', referencedColumnName: 'id' })
  customer!: Customers;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn([{ name: 'user', referencedColumnName: 'id' }])
  user!: User;
}
