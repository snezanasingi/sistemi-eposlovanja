import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";

@Entity("perfume", { schema: "project" })
export class Perfume {
  @PrimaryGeneratedColumn({ type: "int", name: "perfume_id", unsigned: true })
  perfumeId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "brand", length: 255 })
  brand: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Cart, (cart) => cart.perfumes)
  carts: Cart[];
}
