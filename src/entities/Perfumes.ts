import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Manufacturer } from "./Manufacturer";

@Index("uq_name_UNIQUE", ["name"], { unique: true })
@Entity("perfumes", { schema: "project" })
export class Perfumes {
  @PrimaryGeneratedColumn({ type: "int", name: "perfume_id", unsigned: true })
  perfumeId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("int", { name: "cena" })
  cena: number;

  @Column("int", { name: "manufacturer_id" })
  manufacturerId: number;

  @OneToOne(() => Manufacturer, (manufacturer) => manufacturer.perfumes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "perfume_id", referencedColumnName: "manufacturerId" }])
  perfume: Manufacturer;
}
