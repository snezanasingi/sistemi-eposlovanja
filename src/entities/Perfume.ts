import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";

@Entity("perfume", { schema: "project" })
export class Perfume {
  @PrimaryGeneratedColumn({ type: "int", name: "perfume_id", unsigned: true })
  perfumeId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "brand", length: 255 })
  brand: string;

  @Column("varchar", { name: "price", length: 15 })
  price: string;

  @OneToMany(() => Cart, (cart) => cart.perfume)
  carts: Cart[];
}
