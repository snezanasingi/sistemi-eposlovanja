import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfumes } from "./Perfumes";

@Index("uq_manufacturer_brendname", ["brendname"], { unique: true })
@Entity("manufacturer", { schema: "project" })
export class Manufacturer {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "manufacturer_id",
    unsigned: true,
  })
  manufacturerId: number;

  @Column("varchar", { name: "brendname", unique: true, length: 255 })
  brendname: string;

  @OneToOne(() => Perfumes, (perfumes) => perfumes.perfume)
  perfumes: Perfumes;
}
