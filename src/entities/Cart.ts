import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfume } from "./Perfume";
import { User } from "./User";

@Index("fk_cart_user", ["userId"], {})
@Index("fk_cart_perfume", ["perfumeId"], {})
@Entity("cart", { schema: "project" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "total_price", length: 255 })
  totalPrice: string;

  @Column("int", { name: "perfume_id", unsigned: true })
  perfumeId: number;

  @ManyToOne(() => Perfume, (perfume) => perfume.carts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "perfume_id", referencedColumnName: "perfumeId" }])
  perfume: Perfume;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
