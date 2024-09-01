import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import { Perfume } from "./Perfume";
import { User } from "./User";

@Index("fk_cart_user", ["userId"], {})
@Entity("cart", { schema: "project" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "total_price", length: 255 })
  totalPrice: string;

  @ManyToMany(() => Perfume, { cascade: true })
  @JoinTable({
    name: "cart_perfume",
    joinColumn: { name: "cart_id", referencedColumnName: "orderId" },
    inverseJoinColumn: { name: "perfume_id", referencedColumnName: "perfumeId" },
  })
  perfumes: Perfume[];

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}