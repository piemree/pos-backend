import { TransactionProduct } from 'src/transaction-product/entities/transaction-product.entity';
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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: () => 0 })
  stock!: number;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user!: User;

  @OneToMany(
    () => TransactionProduct,
    (transactionProduct) => transactionProduct.product,
  )
  transactionProducts!: TransactionProduct[];
}
