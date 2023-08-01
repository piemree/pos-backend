import { Customers } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({ nullable: true })
  companyName!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  iban!: string;

  @Column({ nullable: true })
  tel1!: string;

  @Column({ nullable: true })
  tel2!: string;

  @Column({ width: 1, default: () => "'0'" })
  emailConfirmed!: boolean;

  @Column({ width: 1, default: () => "'1'" })
  active!: boolean;

  @Column()
  password!: string;

  //role admin or user enum
  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role!: 'admin' | 'user';

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @OneToMany(() => Customers, (customer) => customer.user)
  customers!: Customers[];

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  // hash password before insert
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
