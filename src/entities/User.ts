import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_username_UNIQUE", ["username"], { unique: true })
@Entity("user", { schema: "project" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("bool", { name: "active", default: () => "'true'" })
  active: boolean;
}
