import { Product } from 'src/product/entities/product.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TransactionProduct {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice!: number;

  @Column()
  count!: number;

  @ManyToOne(
    () => Transaction,
    (transaction) => transaction.transactionProducts,
  )
  @JoinColumn({ name: 'transaction', referencedColumnName: 'id' })
  transaction!: Transaction;

  @ManyToOne(() => Product, (products) => products.transactionProducts)
  @JoinColumn([{ name: 'product', referencedColumnName: 'id' }])
  product!: Product;
}
