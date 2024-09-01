import { Entity, PrimaryColumn } from 'typeorm';

@Entity('cart_perfume')
export class CartPerfume {
  @PrimaryColumn('int', { name: 'cart_id', unsigned: true })
  cartId: number;

  @PrimaryColumn('int', { name: 'perfume_id', unsigned: true })
  perfumeId: number;
}
