import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";


@Entity("user", { schema: "project" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "phone", length: 20 })
  phone: any;

  @Column("varchar", { name: "orders", nullable: true, length: 255 })
  orders: string | null;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
